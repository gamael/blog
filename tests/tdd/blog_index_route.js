var chai = require('chai');  
var sinon = require('sinon');  
var sinonChai = require('sinon-chai');
chai.use(sinonChai);  
chai.should();
 // Object to mock the articles model
    var articlesMock;
    //Mock for the promise returned by articles for index
    var promiseMock;
    // Object to mock the response
    var response;
    // Blog route
    var blog
    function requireBlog(models) {
        return require('../../routes/blog.js')(models);
    }
    function callBlogIndexRoute() {
        blog.index({}, response);
        }

describe('Blog Index route', function () {
   
    beforeEach(function () {
        response = {};
        promiseMock = {};
        articlesMock = {};
        articlesMock.articlesForIndex = sinon.stub()
            .returns(promiseMock);
        promiseMock.then = sinon.spy();
        response.render = sinon.stub();
        response.send = sinon.stub();
        blog = requireBlog({Article: articlesMock});
    });
    //Snip - Existing tests removed for brevity
    it('Calls the render function', function () {
        callBlogIndexRoute();
        // Call the promise resolve function
        promiseMock.then.getCall(0).args[0]({});
        response.render.should.have.been.calledOnce;
    });
    it('Calls the render function with the correct template name', function () {
    callBlogIndexRoute();
    // Call the promise resolve function
    promiseMock.then.getCall(0).args[0]({});
    response.render.getCall(0).args.length.should.be.above(0);
    response.render.getCall(0).args[0].should.equal('blog_index');
	});
	it('Passes the articles to the render function', function () {  
	    var articles = {};
	    callBlogIndexRoute();
	    // Call the promise resolve function
	    promiseMock.then.getCall(0).args[0](articles);
	    var args = response.render.getCall(0).args
	    args.length.should.be.above(1);
	    args[1].should.be.an.object;
	    args[1].should.have.property('articles');
	    args[1].articles.should.equal(articles);
	});
	it('Sends a 500 status on error', function () {
	    callBlogIndexRoute();
	    // Call the promise reject function
	    promiseMock.then.getCall(0).args[1]({message: "There was an error"});
	    response.send.should.have.been.calledOnce;
	    response.send.should.have.been.calledWith(500);
	});
});