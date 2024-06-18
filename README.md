# webapp
<ol>
<li>The webapp is a backend application built using Javascript, Express.js as the primary technology.</li>
<li>The ORM framework used here is the Sequalize, which thereby makes the calls to the MySql database.</li>
<li>The following pre-requisites are required: </li> <br/>

<ul>
  <li>Various npm dependencies such as express, bcrypt etc. have to be installed</li>
  <li>The application primarily contains 3 end points, each for getting, creating and updating user details</li>
  <li>The API's are proteted with basic auth authentication token.</li>
  <li>It requires username and password</li>
<li>Also added integration tests</li>
  <li>Built machine images and VM instances</li>
</ul>
</ol>

<li>The CI/CD pipeline has been set up, using GitHub Actions, which allows code merge upon passing integration test workflow (CI) and runs the Packer Image Build workflow most merge(CD) </li>
<li> The GCP Ops Agent is integrated and node-json logger is used for logging and monitoring</li>
<li>Verification mail is sent with event driven architecture</li>
