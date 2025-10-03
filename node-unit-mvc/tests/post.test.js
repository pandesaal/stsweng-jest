const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        },
        params: {
            id: '507asdghajsdhjgasd'
        }
    };

    let error = new Error('Some error message');

    let res = {};

    let expectedResult;


    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            PostController.create(req, res);

            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        it('should return status 500 on server error', () => {
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            PostController.create(req, res);

            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            updatePostStub.restore();
        });


        it('should return the updated post object', () => {
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);

            PostController.update(req, res);

            sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        it('should return status 500 on server error', () => {
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(error);

            PostController.update(req, res);

            sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('findPost', () => {
        var findPostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            findPostStub.restore();
        });


        it('should return the found post object', () => {
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, expectedResult);

            PostController.findPost(req, res);

            sinon.assert.calledWith(PostModel.findPost, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({ title: expectedResult.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: expectedResult.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: expectedResult.author }));

        });


        it('should return status 500 on server error', () => {
            findPostStub = sinon.stub(PostModel, 'findPost').yields(error);

            PostController.findPost(req, res);

            sinon.assert.calledWith(PostModel.findPost, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    })
});
