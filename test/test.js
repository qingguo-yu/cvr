
var assert = require( "assert" );
var cvr = require( "../source" );

var accessToken = process.env.GITHUB_TOKEN || require( "./local.json" ).GITHUB_TOKEN;
var gitHubUser = require( "./local.json" ).GITHUB_USER;
var gitHubRepo = require( "./local.json" ).GITHUB_REPO;
var coveredFile = require( "./local.json" ).COVERED_FILE;


describe( "git", function ()
{
    this.timeout( 5000 );

    xit( "should get a list of repos from GitHub", function ( done )
    {
        cvr.getGitHubRepos( accessToken, function ( err, repos )
        {
            assert( !err );
            assert( repos.length > 0 );
            done();
        } );
    } );

    it( "should get a commit from git", function ( done )
    {
        cvr.getCommit( accessToken, gitHubUser, gitHubRepo, null, function ( err, commit )
        {
            assert( !err );
            assert( commit != null );
            done();
        } );
    } );

    xit( "should get a blob from git", function ( done )
    {
        cvr.getBlob( gitHubUser, gitHubRepo, null, "README.md", function ( err, blob )
        {
            assert( !err );
            assert( !!String( blob ) );
            done();
        } );
    } );

    it( "should create a coverage report for a file", function ( done )
    {
        cvr.getBlob( gitHubUser, gitHubRepo, null, coveredFile, function ( err, blob )
        {
            assert.equal( !!err, false );
            assert.equal( !!String( blob ), true );

            var text = String( blob );

            cvr.parseLCOV( "./test/assets/lcov.info", function ( err, cov )
            {
                console.log( cov );
                done();
            } )
        } );
    } );

} );