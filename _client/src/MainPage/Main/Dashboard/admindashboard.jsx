/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { withRouter } from 'react-router-dom';
import {User,Avatar_19,Avatar_07,Avatar_06,Avatar_14} from '../../../Entryfile/imagepath.jsx'

import {BarChart,Bar, Cell,ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import "../../index.css"
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const barchartdata = [
      { y: '2006', "Total Income" : 100, 'Total Outcome' : 90 },
			{ y: '2007', "Total Income" : 75,  'Total Outcome' : 65 },
			{ y: '2008', "Total Income" : 50,  'Total Outcome' : 40 },
			{ y: '2009', "Total Income" : 75,  'Total Outcome' : 65 },
			{ y: '2010', "Total Income" : 50,  'Total Outcome' : 40 },
			{ y: '2011', "Total Income" : 75,  'Total Outcome' : 65 },
			{ y: '2012', "Total Income" : 100, 'Total Outcome' : 90 }
];
const linechartdata = [
      { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
			{ y: '2007', "Total Sales": 75,  'Total Revenue': 65 },
			{ y: '2008', "Total Sales": 50,  'Total Revenue': 40 },
			{ y: '2009', "Total Sales": 75,  'Total Revenue': 65 },
			{ y: '2010', "Total Sales": 50,  'Total Revenue': 40 },
			{ y: '2011', "Total Sales": 75,  'Total Revenue': 65 },
			{ y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
];
class AdminDashboard extends Component {
  UNSAFE_componentWillMount (){
    let firstload = localStorage.getItem("firstload")
    if(firstload === "true"){
        setTimeout(function() {
          window.location.reload(1)
          localStorage.removeItem("firstload")
        },1000)
    }
  }

   render() {
      return (
         
         <div className="page-wrapper">
             <Helmet>
                    <title>Dashboard - HRMS Admin Template</title>
                    <meta name="description" content="Dashboard"/>					
            </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Welcome Admin!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                  <div className="dash-widget-info">
                    <h3>112</h3>
                    <span>Projects</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                  <div className="dash-widget-info">
                    <h3>44</h3>
                    <span>Clients</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                  <div className="dash-widget-info">
                    <h3>37</h3>
                    <span>Tasks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                  <div className="dash-widget-info">
                    <h3>218</h3>
                    <span>Employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Total Revenue</h3>
                      {/* <div id="bar-charts" /> */}
                      <ResponsiveContainer width='100%' height={342}>
                      <BarChart                         
                         data={barchartdata}
                         margin={{
                           top: 5, right: 5, left: 5, bottom: 5,
                         }}
                       >
                         <CartesianGrid />
                         <XAxis dataKey="y" />
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Bar dataKey="Total Income" fill="#667eea" />
                         <Bar dataKey="Total Outcome" fill="#764ba2" />
                       </BarChart>
                      </ResponsiveContainer>
                                           
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Sales Overview</h3>
                      <ResponsiveContainer width='100%' height={342}>
                      <LineChart data={linechartdata}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid  />
                        <XAxis dataKey="y" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Total Sales" stroke="#667eea" fill="#667eea" strokeWidth={3} dot={{r : 3}} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="Total Revenue" stroke="#764ba2" fill="#764ba2" strokeWidth={3} dot={{r : 3}} activeDot={{ r: 7 }} />
                      </LineChart>
                      </ResponsiveContainer>
                      
                      {/* <div id="line-charts" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card-group m-b-30">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">New Employees</span>
                      </div>
                      <div>
                        <span className="text-success">+10%</span>
                      </div>
                    </div>
                    <h3 className="mb-3">10</h3>
                    <div className="progress mb-2" style={{height: '5px'}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mb-0">Overall Employees 218</p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">Earnings</span>
                      </div>
                      <div>
                        <span className="text-success">+12.5%</span>
                      </div>
                    </div>
                    <h3 className="mb-3">$1,42,300</h3>
                    <div className="progress mb-2" style={{height: '5px'}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mb-0">Previous Month <span className="text-muted">$1,15,852</span></p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">Expenses</span>
                      </div>
                      <div>
                        <span className="text-danger">-2.8%</span>
                      </div>
                    </div>
                    <h3 className="mb-3">$8,500</h3>
                    <div className="progress mb-2" style={{height: '5px'}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mb-0">Previous Month <span className="text-muted">$7,500</span></p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <span className="d-block">Profit</span>
                      </div>
                      <div>
                        <span className="text-danger">-75%</span>
                      </div>
                    </div>
                    <h3 className="mb-3">$1,12,000</h3>
                    <div className="progress mb-2" style={{height: '5px'}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mb-0">Previous Month <span className="text-muted">$1,42,000</span></p>
                  </div>
                </div>
              </div>
            </div>	
          </div>
          {/* Statistics Widget */}
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-4 d-flex">
              <div className="card flex-fill dash-statistics">
                <div className="card-body">
                  <h5 className="card-title">Statistics</h5>
                  <div className="stats-list">
                    <div className="stats-info">
                      <p>Today Leave <strong>4 <small>/ 65</small></strong></p>
                      <div className="progress">
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: '31%'}} aria-valuenow={31} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>Pending Invoice <strong>15 <small>/ 92</small></strong></p>
                      <div className="progress">
                        <div className="progress-bar bg-warning" role="progressbar" style={{width: '31%'}} aria-valuenow={31} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>Completed Projects <strong>85 <small>/ 112</small></strong></p>
                      <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={{width: '62%'}} aria-valuenow={62} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>Open Tickets <strong>190 <small>/ 212</small></strong></p>
                      <div className="progress">
                        <div className="progress-bar bg-danger" role="progressbar" style={{width: '62%'}} aria-valuenow={62} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                    <div className="stats-info">
                      <p>Closed Tickets <strong>22 <small>/ 212</small></strong></p>
                      <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={{width: '22%'}} aria-valuenow={22} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <h4 className="card-title">Task Statistics</h4>
                  <div className="statistics">
                    <div className="row">
                      <div className="col-md-6 col-6 text-center">
                        <div className="stats-box mb-4">
                          <p>Total Tasks</p>
                          <h3>385</h3>
                        </div>
                      </div>
                      <div className="col-md-6 col-6 text-center">
                        <div className="stats-box mb-4">
                          <p>Overdue Tasks</p>
                          <h3>19</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="progress mb-4">
                    <div className="progress-bar bg-purple" role="progressbar" style={{width: '30%'}} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>30%</div>
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: '22%'}} aria-valuenow={18} aria-valuemin={0} aria-valuemax={100}>22%</div>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: '24%'}} aria-valuenow={12} aria-valuemin={0} aria-valuemax={100}>24%</div>
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: '26%'}} aria-valuenow={14} aria-valuemin={0} aria-valuemax={100}>21%</div>
                    <div className="progress-bar bg-info" role="progressbar" style={{width: '10%'}} aria-valuenow={14} aria-valuemin={0} aria-valuemax={100}>10%</div>
                  </div>
                  <div>
                    <p><i className="fa fa-dot-circle-o text-purple mr-2" />Completed Tasks <span className="float-right">166</span></p>
                    <p><i className="fa fa-dot-circle-o text-warning mr-2" />Inprogress Tasks <span className="float-right">115</span></p>
                    <p><i className="fa fa-dot-circle-o text-success mr-2" />On Hold Tasks <span className="float-right">31</span></p>
                    <p><i className="fa fa-dot-circle-o text-danger mr-2" />Pending Tasks <span className="float-right">47</span></p>
                    <p className="mb-0"><i className="fa fa-dot-circle-o text-info mr-2" />Review Tasks <span className="float-right">5</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <h4 className="card-title">Today Absent <span className="badge bg-inverse-danger ml-2">5</span></h4>
                  <div className="leave-info-box">
                    <div className="media align-items-center">
                      <a href="/blue/app/profile/employee-profile" className="avatar"><img alt="" src={User} /></a>
                      <div className="media-body">
                        <div className="text-sm my-0">Martin Lewis</div>
                      </div>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-6">
                        <h6 className="mb-0">4 Sep 2019</h6>
                        <span className="text-sm text-muted">Leave Date</span>
                      </div>
                      <div className="col-6 text-right">
                        <span className="badge bg-inverse-danger">Pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="leave-info-box">
                    <div className="media align-items-center">
                      <a href="/blue/app/profile/employee-profile" className="avatar"><img alt="" src={User} /></a>
                      <div className="media-body">
                        <div className="text-sm my-0">Martin Lewis</div>
                      </div>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-6">
                        <h6 className="mb-0">4 Sep 2019</h6>
                        <span className="text-sm text-muted">Leave Date</span>
                      </div>
                      <div className="col-6 text-right">
                        <span className="badge bg-inverse-success">Approved</span>
                      </div>
                    </div>
                  </div>
                  <div className="load-more text-center">
                    <a className="text-dark" href="">Load More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Statistics Widget */}
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Invoices</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-nowrap custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Invoice ID</th>
                          <th>Client</th>
                          <th>Due Date</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><a href="/blue/app/accounts/invoices-view">#INV-0001</a></td>
                          <td>
                            <h2><a href="#">Global Technologies</a></h2>
                          </td>
                          <td>11 Mar 2019</td>
                          <td>$380</td>
                          <td>
                            <span className="badge bg-inverse-warning">Partially Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td><a href="/blue/app/accounts/invoices-view">#INV-0002</a></td>
                          <td>
                            <h2><a href="#">Delta Infotech</a></h2>
                          </td>
                          <td>8 Feb 2019</td>
                          <td>$500</td>
                          <td>
                            <span className="badge bg-inverse-success">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td><a href="/blue/app/accounts/invoices-view">#INV-0003</a></td>
                          <td>
                            <h2><a href="#">Cream Inc</a></h2>
                          </td>
                          <td>23 Jan 2019</td>
                          <td>$60</td>
                          <td>
                            <span className="badge bg-inverse-danger">Unpaid</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <a href="/blue/app/accounts/invoices">View all invoices</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Payments</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">	
                    <table className="table custom-table table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>Invoice ID</th>
                          <th>Client</th>
                          <th>Payment Type</th>
                          <th>Paid Date</th>
                          <th>Paid Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><a href="/blue/app/accounts/invoices-view">#INV-0001</a></td>
                          <td>
                            <h2><a href="#">Global Technologies</a></h2>
                          </td>
                          <td>Paypal</td>
                          <td>11 Mar 2019</td>
                          <td>$380</td>
                        </tr>
                        <tr>
                          <td><a href="/blue/app/accounts/invoices-view">#INV-0002</a></td>
                          <td>
                            <h2><a href="#">Delta Infotech</a></h2>
                          </td>
                          <td>Paypal</td>
                          <td>8 Feb 2019</td>
                          <td>$500</td>
                        </tr>
                        <tr>
                          <td><a href="/blue/app/accounts/invoices-view">#INV-0003</a></td>
                          <td>
                            <h2><a href="#">Cream Inc</a></h2>
                          </td>
                          <td>Paypal</td>
                          <td>23 Jan 2019</td>
                          <td>$60</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <a href="/blue/app/accounts/payments">View all payments</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Clients</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="#" className="avatar"><img alt="" src={Avatar_19} /></a>
                              <a href="/blue/app/profile/client-profile">Barry Cuda <span>CEO</span></a>
                            </h2>
                          </td>
                          <td>barrycuda@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-success" /> Active
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="#" className="avatar"><img alt="" src={Avatar_19} /></a>
                              <a href="/blue/app/profile/client-profile">Tressa Wexler <span>Manager</span></a>
                            </h2>
                          </td>
                          <td>tressawexler@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-danger" /> Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="/blue/app/profile/client-profile" className="avatar"><img alt="" src={Avatar_07} /></a>
                              <a href="/blue/app/profile/client-profile">Ruby Bartlett <span>CEO</span></a>
                            </h2>
                          </td>
                          <td>rubybartlett@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-danger" /> Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="/blue/app/profile/client-profile" className="avatar"><img alt="" src={Avatar_06} /></a>
                              <a href="/blue/app/profile/client-profile"> Misty Tison <span>CEO</span></a>
                            </h2>
                          </td>
                          <td>mistytison@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-success" /> Active
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="/blue/app/profile/client-profile" className="avatar"><img alt="" src={Avatar_14} /></a>
                              <a href="/blue/app/profile/client-profile"> Daniel Deacon <span>CEO</span></a>
                            </h2>
                          </td>
                          <td>danieldeacon@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-danger" /> Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <a href="/blue/app/employees/clients">View all clients</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Recent Projects</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Project Name </th>
                          <th>Progress</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h2><a href="/blue/app/projects/projects-view">Office Management</a></h2>
                            <small className="block text-ellipsis">
                              <span>1</span> <span className="text-muted">open tasks, </span>
                              <span>9</span> <span className="text-muted">tasks completed</span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div className="progress-bar" role="progressbar" data-toggle="tooltip" title="65%" style={{width: '65%'}} />
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2><a href="/blue/app/projects/projects-view">Project Management</a></h2>
                            <small className="block text-ellipsis">
                              <span>2</span> <span className="text-muted">open tasks, </span>
                              <span>5</span> <span className="text-muted">tasks completed</span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div className="progress-bar" role="progressbar" data-toggle="tooltip" title="15%" style={{width: '15%'}} />
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2><a href="/blue/app/projects/projects-view">Video Calling App</a></h2>
                            <small className="block text-ellipsis">
                              <span>3</span> <span className="text-muted">open tasks, </span>
                              <span>3</span> <span className="text-muted">tasks completed</span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div className="progress-bar" role="progressbar" data-toggle="tooltip" title="49%" style={{width: '49%'}} />
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2><a href="/blue/app/projects/projects-view">Hospital Administration</a></h2>
                            <small className="block text-ellipsis">
                              <span>12</span> <span className="text-muted">open tasks, </span>
                              <span>4</span> <span className="text-muted">tasks completed</span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div className="progress-bar" role="progressbar" data-toggle="tooltip" title="88%" style={{width: '88%'}} />
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2><a href="/blue/app/projects/projects-view">Digital Marketplace</a></h2>
                            <small className="block text-ellipsis">
                              <span>7</span> <span className="text-muted">open tasks, </span>
                              <span>14</span> <span className="text-muted">tasks completed</span>
                            </small>
                          </td>
                          <td>
                            <div className="progress progress-xs progress-striped">
                              <div className="progress-bar" role="progressbar" data-toggle="tooltip" title="100%" style={{width: '100%'}} />
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href=""><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href=""><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <a href="/blue/app/projects/project_dashboard">View all projects</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      );
   }
}

export default withRouter(AdminDashboard);
