'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'PostController.home')

// auth screen
Route.on('/signup').render('auth.signup')
Route.post('/signup', 'UserController.create').validator('CreateUser')

Route.on('/login').render('auth.login')
Route.post('/login', 'UserController.login').validator('LoginUser')

// logout
Route.get('/logout', async({ auth, response }) => {
    await auth.logout();
    return response.redirect('/')
});

// post route
Route.get('/make-a-post', 'PostController.userIndex');


Route.group(() => {
    Route.get('/delete/:id', 'PostController.delete');
    Route.get('/edit/:id', 'PostController.edit');
    Route.post('/update/:id', 'PostController.update').validator('CreateJob');
}).prefix('/make-a-post')

Route.post('/make-a-post', 'PostController.create').validator('CreateJob');