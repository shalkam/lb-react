
      <div>
        <Header />
        {/* Main */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              {/* Left column */}
              <Nav />
            </div>
            {/* /col-3 */}
            <div className="col-sm-9">
              {/* column 2 */}

              <div className="row">
                {/* center left*/}
                <div className="col-md-6">
                  <div className="well">Inbox Messages <span className="badge pull-right">3</span></div>
                  <hr />
                  <div className="btn-group btn-group-justified">
                    <a href="#" className="btn btn-primary col-sm-3">
                      <i className="glyphicon glyphicon-plus" />
                      <br /> Service
                    </a>
                    <a href="#" className="btn btn-primary col-sm-3">
                      <i className="glyphicon glyphicon-cloud" />
                      <br /> Cloud
                    </a>
                    <a href="#" className="btn btn-primary col-sm-3">
                      <i className="glyphicon glyphicon-cog" />
                      <br /> Tools
                    </a>
                    <a href="#" className="btn btn-primary col-sm-3">
                      <i className="glyphicon glyphicon-question-sign" />
                      <br /> Help
                    </a>
                  </div>
                  <hr />
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>Reports</h4></div>
                    <div className="panel-body">
                      <small>Success</small>
                      <div className="progress">
                        <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} style={{width: '72%'}}>
                          <span className="sr-only">72% Complete</span>
                        </div>
                      </div>
                      <small>Info</small>
                      <div className="progress">
                        <div className="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{width: '20%'}}>
                          <span className="sr-only">20% Complete</span>
                        </div>
                      </div>
                      <small>Warning</small>
                      <div className="progress">
                        <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}}>
                          <span className="sr-only">60% Complete (warning)</span>
                        </div>
                      </div>
                      <small>Danger</small>
                      <div className="progress">
                        <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}}>
                          <span className="sr-only">80% Complete</span>
                        </div>
                      </div>
                    </div>
                    {/*/panel-body*/}
                  </div>
                  {/*/panel*/}
                  <hr />
                  {/*tabs*/}
                  <div className="panel">
                    <ul className="nav nav-tabs" id="myTab">
                      <li className="active"><a href="#profile" data-toggle="tab">Profile</a></li>
                      <li><a href="#messages" data-toggle="tab">Messages</a></li>
                      <li><a href="#settings" data-toggle="tab">Settings</a></li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane active well" id="profile">
                        <h4><i className="glyphicon glyphicon-user" /></h4> Lorem profile dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate.
                        <p>Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis dolor, in sagittis nisi.</p>
                      </div>
                      <div className="tab-pane well" id="messages">
                        <h4><i className="glyphicon glyphicon-comment" /></h4> Message ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate.
                        <p>Quisque mauris augu.</p>
                      </div>
                      <div className="tab-pane well" id="settings">
                        <h4><i className="glyphicon glyphicon-cog" /></h4> Lorem settings dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate.
                        <p>Quisque mauris augue, molestie.</p>
                      </div>
                    </div>
                  </div>
                  {/*/tabs*/}
                  <hr />
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>New Requests</h4></div>
                    <div className="panel-body">
                      <div className="list-group">
                        <a href="#" className="list-group-item active">Hosting virtual mailbox serv..</a>
                        <a href="#" className="list-group-item">Dedicated server doesn't..</a>
                        <a href="#" className="list-group-item">RHEL 6 install on new..</a>
                      </div>
                    </div>
                  </div>
                </div>
                {/*/col*/}
                <div className="col-md-6">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>Notices</h4></div>
                    <div className="panel-body">
                      <div className="alert alert-info">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        This is a dismissable alert.. just sayin'.
                      </div>
                      <p>This is a dashboard-style layout that uses Bootstrap 3. You can use this template as a starting point to create something more unique.</p>
                      <p>Visit the Bootstrap Playground at <a href="http://bootply.com">Bootply</a> to tweak this layout or discover more useful code snippets.</p>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Visits</th>
                          <th>ROI</th>
                          <th>Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>45</td>
                          <td>2.45%</td>
                          <td>Direct</td>
                        </tr>
                        <tr>
                          <td>289</td>
                          <td>56.2%</td>
                          <td>Referral</td>
                        </tr>
                        <tr>
                          <td>98</td>
                          <td>25%</td>
                          <td>Type</td>
                        </tr>
                        <tr>
                          <td>..</td>
                          <td>..</td>
                          <td>..</td>
                        </tr>
                        <tr>
                          <td>..</td>
                          <td>..</td>
                          <td>..</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <i className="glyphicon glyphicon-wrench pull-right" />
                        <h4>Post Request</h4>
                      </div>
                    </div>
                    <div className="panel-body">
                      <form className="form form-vertical">
                        <div className="control-group">
                          <label>Name</label>
                          <div className="controls">
                            <input type="text" className="form-control" placeholder="Enter Name" />
                          </div>
                        </div>
                        <div className="control-group">
                          <label>Message</label>
                          <div className="controls">
                            <textarea className="form-control" defaultValue={""} />
                          </div>
                        </div>
                        <div className="control-group">
                          <label>Category</label>
                          <div className="controls">
                            <select className="form-control">
                              <option>options</option>
                            </select>
                          </div>
                        </div>
                        <div className="control-group">
                          <label />
                          <div className="controls">
                            <button type="submit" className="btn btn-primary">
                              Post
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/*/panel content*/}
                  </div>
                  {/*/panel*/}
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <h4>Engagement</h4></div>
                    </div>
                    <div className="panel-body">
                      <div className="col-xs-4 text-center"><img src="http://placehold.it/80/BBBBBB/FFF" className="img-circle img-responsive" /></div>
                      <div className="col-xs-4 text-center"><img src="http://placehold.it/80/EFEFEF/555" className="img-circle img-responsive" /></div>
                      <div className="col-xs-4 text-center"><img src="http://placehold.it/80/EEEEEE/222" className="img-circle img-responsive" /></div>
                    </div>
                  </div>
                  {/*/panel*/}
                </div>
                {/*/col-span-6*/}
              </div>
              {/*/row*/}
              <hr />
              <a href="#"><strong><i className="glyphicon glyphicon-comment" /> Discussions</strong></a>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <ul className="list-group">
                    <li className="list-group-item"><a href="#"><i className="glyphicon glyphicon-flash" /> <small>(3 mins ago)</small> The 3rd page reports don't contain any links. Does anyone know why..</a></li>
                    <li className="list-group-item"><a href="#"><i className="glyphicon glyphicon-flash" /> <small>(1 hour ago)</small> Hi all, I've just post a report that show the relationship betwe..</a></li>
                    <li className="list-group-item"><a href="#"><i className="glyphicon glyphicon-heart" /> <small>(2 hrs ago)</small> Paul. That document you posted yesterday doesn't seem to contain the over..</a></li>
                    <li className="list-group-item"><a href="#"><i className="glyphicon glyphicon-heart-empty" /> <small>(4 hrs ago)</small> The map service on c243 is down today. I will be fixing the..</a></li>
                    <li className="list-group-item"><a href="#"><i className="glyphicon glyphicon-heart" /> <small>(yesterday)</small> I posted a new document that shows how to install the services layer..</a></li>
                    <li className="list-group-item"><a href="#"><i className="glyphicon glyphicon-flash" /> <small>(yesterday)</small> ..</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/*/col-span-9*/}
          </div>
        </div>
        {/* /Main */}
        <footer className="text-center">This Bootstrap 3 dashboard layout is compliments of <a href="http://www.bootply.com/85850"><strong>Bootply.com</strong></a></footer>
        <div className="modal" id="addWidgetModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 className="modal-title">Add Widget</h4>
              </div>
              <div className="modal-body">
                <p>Add a widget stuff here..</p>
              </div>
              <div className="modal-footer">
                <a href="#" data-dismiss="modal" className="btn">Close</a>
                <a href="#" className="btn btn-primary">Save changes</a>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dalog */}
        </div>
        </div>
