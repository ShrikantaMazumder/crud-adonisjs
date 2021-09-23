'use strict'
let Post = use('App/Models/Post')

class PostController {
    async home({view}) {

        // fetch all post
        const posts = await Post.all()
        return view.render('index', { posts: posts.toJSON() })
    }

    // get post by user
    async userIndex({view, auth}) {
        const posts = await auth.user.posts().fetch();

        return view.render('posts', { posts: posts.toJSON() });
    }

    // create post
    async create({ request, response, session, auth }) {
        const data = request.all();

        const posted = await auth.user.posts().create({
            title: data.title,
            link: data.link,
            description: data.description
        })

        session.flash({ message: "Your job has been posted!" })
        return response.redirect('back');
    }

    // delete post
    async delete({ response, session, params }) {
        const  post = await Post.find(params.id);
        await post.delete();
        session.flash({ message: "You post has been removed!" })
        return response.redirect('back');
    }

    // edit post
    async edit({ params, view }) {
        const post = await Post.find(params.id);
        return view.render('edit', { post: post })
    }

    // update post
    async update({ response, request, session, params }) {
        const post = await Post.find(params.id);

        post.title = request.all().title;
        post.link = request.all().link;
        post.description = request.all().description;

        await post.save();

        session.flash({ message: 'Your post has been updated' });
        return response.redirect('/make-a-post')
    }
}

module.exports = PostController
