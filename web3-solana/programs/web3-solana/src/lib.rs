/// Include libraries for program
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;
use anchor_lang::solana_program::log::{
    sol_log_compute_units
};

declare_id!("8Et4TdRcRoiaiY5kQwk2px3dMkmRRDVTDPzwbT8wBjNv");

// Post and comment text length
const TEXT_LENGTH: usize = 1024;
// Username length
const USER_NAME_LENGTH: usize = 100;
// User profile imaage url length
const USER_URL_LENGTH: usize = 255;
const PHOTO_URL_LENGTH: usize = 255;

const NUMBER_OF_ALLOWED_LIKES_SPACE: usize = 5;
// const NUMBER_OF_ALLOWED_LIKES: u8 = 5;

/// Web3 Solana program
#[program]
pub mod web3_solana {
    use super::*;

    /// Create state to save the post counts
    /// There is only one state in the program
    /// This account should be initialized before post
    pub fn create_state(
        ctx: Context<CreateState>,
    ) -> ProgramResult {
        // Get state from context
        let state = &mut ctx.accounts.state;
        // Save authority to state
        state.authority = ctx.accounts.authority.key();
        // Set post count as 0 when initializing
        state.post_count = 0;
        state.photo_count = 0;
        Ok(())
    }

    /// Create post
    /// @param text:        text of post
    /// @param poster_name: name of post creator
    /// @param poster_url:  url of post creator avatar
    pub fn create_post(
        ctx: Context<CreatePost>,
        text: String,
        poster_name: String,
        poster_url: String,
    ) -> ProgramResult {
        // Get State
        let state = &mut ctx.accounts.state;

        // Get post
        let post = &mut ctx.accounts.post;
        // Set authority
        post.authority = ctx.accounts.authority.key();
        // Set text
        post.text = text;
        // Set poster name
        post.poster_name = poster_name;
        // Set poster avatar url
        post.poster_url = poster_url;
        // Set comment count as 0
        post.comment_count = 0;
        // Set post index as state's post count
        post.index = state.post_count;
        // Set post time
        post.post_time = ctx.accounts.clock.unix_timestamp;

        post.likes = 0;

        // Increase state's post count by 1
        state.post_count += 1;
        sol_log_compute_units();
        Ok(())
    }

    pub fn create_photo(
        ctx: Context<CreatePhoto>,
        description: String,
        photo_url: String,
        poster_name: String,
        poster_url: String,
    ) -> ProgramResult {
        // Get State
       msg!(&description);  //logging

    //    if description.trim().is_empty() || photo_url.trim().is_empty() {
    //        return Err(Errors::CannotCreatePhoto.into());
    //    }
        let state = &mut ctx.accounts.state;

        // Get photo
        let photo = &mut ctx.accounts.photo;
        // Set authority
        photo.authority = ctx.accounts.authority.key();
        // Set text
        photo.description = description;
        photo.photo_url = photo_url;

        // Set creator name
        photo.poster_name = poster_name;
        // Set creator avatar url
        photo.poster_url = poster_url;
        // Set comment count as 0
        photo.comment_count = 0;
        // Set photo index as state's photo count
        photo.index = state.photo_count;
        // Set photo time
        photo.post_time = ctx.accounts.clock.unix_timestamp;

        photo.likes = 0;

        // photo.remove = 0;

        // Increase state's photo count by 1
        state.photo_count += 1;
        msg!("Photo Added!");  //logging
        sol_log_compute_units(); //Logs how many compute units are left, important for budget
        Ok(())
    }

    /// Create comment for post
    /// @param text:            text of comment
    /// @param commenter_name:  name of comment creator
    /// @param commenter_url:   url of comment creator avatar
    pub fn create_comment(
        ctx: Context<CreateComment>,
        text: String,
        commenter_name: String,
        commenter_url: String,
    ) -> ProgramResult {

        // Get post
        let post = &mut ctx.accounts.post;

        // Get comment
        let comment = &mut ctx.accounts.comment;
        // Set authority to comment
        comment.authority = ctx.accounts.authority.key();
        // Set comment text
        comment.text = text;
        // Set commenter name
        comment.commenter_name = commenter_name;
        // Set commenter url
        comment.commenter_url = commenter_url;
        // Set comment index to post's comment count
        comment.index = post.comment_count;
        // Set post time
        comment.post_time = ctx.accounts.clock.unix_timestamp;

        // Increase post's comment count by 1
        post.comment_count += 1;

        Ok(())
    }

    pub fn like_post(ctx: Context<LikePost>) -> ProgramResult {
        let post = &mut ctx.accounts.post;

        // if post.likes == NUMBER_OF_ALLOWED_LIKES{
        //     return Err(Errors::ReachedMaxLikes.into());
        // }

        let mut iter = post.people_who_liked.iter();
        let user_liking_post = ctx.accounts.authority.key();
        if iter.any(|&v| v == user_liking_post) {
            return Err(Errors::UserLikedPost.into());
        }

        post.likes += 1;
        post.people_who_liked.push(user_liking_post);

        Ok(())
    }

}

/// Contexts
/// CreateState context
#[derive(Accounts)]
pub struct CreateState<'info> {
    // Authenticating state account
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8
    )]
    pub state: Account<'info, StateAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

/// CreatePost context
#[derive(Accounts)]
pub struct CreatePost<'info> {
    // Authenticate state account
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, StateAccount>,

    // Authenticate post account
    #[account(
        init,
        // Post account use string "post" and index of post as seeds
        seeds = [b"post".as_ref(), state.post_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<PostAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH+8+32*NUMBER_OF_ALLOWED_LIKES_SPACE
    )]
    pub post: Account<'info, PostAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

/// CreatePhoto context
#[derive(Accounts)]
pub struct CreatePhoto<'info> {
    // Authenticate state account
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, StateAccount>,

    // Authenticate photo account
    #[account(
        init,
        // Photo account use string "photo" and index of photo as seeds
        seeds = [b"photo".as_ref(), state.photo_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<PhotoAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH+PHOTO_URL_LENGTH+8+32*NUMBER_OF_ALLOWED_LIKES_SPACE // 32 bits in a pubkey and we have 5
    )]
    pub photo: Account<'info, PhotoAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account for tiktok
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

/// CreateComment context
#[derive(Accounts)]
pub struct CreateComment<'info> {
    // Authenticate post account
    #[account(mut, seeds = [b"post".as_ref(), post.index.to_be_bytes().as_ref()], bump)]
    pub post: Account<'info, PostAccount>,

    // Authenticate comment account
    #[account(
        init,
        // Post account use string "comment", index of post and index of comment per post as seeds
        seeds = [b"comment".as_ref(), post.index.to_be_bytes().as_ref(), post.comment_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<CommentAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH
    )]
    pub comment: Account<'info, CommentAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}


// State Account Structure
#[account]
pub struct StateAccount {
    // Signer address
    pub authority: Pubkey,

    // Post count
    pub post_count: u64,

    // photo count
    pub photo_count: u64,
}

// Post Account Structure
#[account]
pub struct PostAccount {
    // Signer address
    pub authority: Pubkey,

    // Post text
    pub text: String,

    // Post creator name
    pub poster_name: String,

    // Post creator url
    pub poster_url: String,

    // Comment counts of post
    pub comment_count: u64,

    // Post index
    pub index: u64,

    // Post time
    pub post_time: i64,

    // likes: vector of people who liked it,
    pub people_who_liked: Vec<Pubkey>,

    pub likes: u8,

}

#[account]
pub struct PhotoAccount {
    // Signer address
    pub authority: Pubkey,

    // description text
    pub description: String,

    // photo url
    pub photo_url: String,

    // Photo creator name
    pub poster_name: String,

    // Photo creator url
    pub poster_url: String,

    // Comment counts of videos
    pub comment_count: u64,

    // Video index
    pub index: u64,

    // Video time
    pub post_time: i64,

    // likes: vector of people who liked it,
    pub people_who_liked: Vec<Pubkey>,

    // number of likes
    pub likes: u8,
}



// Comment Account Structure
#[account]
pub struct CommentAccount {
    // Signer address
    pub authority: Pubkey,

    // Comment text
    pub text: String,

    // commenter_name
    pub commenter_name: String,

    // commenter_url
    pub commenter_url: String,

    // Comment index
    pub index: u64,

    // Post time
    pub post_time: i64,

}

#[derive(Accounts)]
pub struct LikePost<'info> {

    #[account(mut)]
    pub post: Account<'info, PostAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: UncheckedAccount<'info>,

    // #[account(constraint = token_program.key == &token::ID)]
    // pub token_program: Program<'info, Token>,

    pub clock: Sysvar<'info, Clock>,
    
}


#[error]
pub enum Errors {
    #[msg("User cannot be created, missing data")]
    CannotCreateUser,

    #[msg("Cannot receive more than 5 likes")]
    ReachedMaxLikes,

    #[msg("User has already liked the post")]
    UserLikedPost,

}
