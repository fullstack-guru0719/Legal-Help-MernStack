
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Applogo} from "../../../Entryfile/imagepath"

class Invoice extends Component {
   render() {
      return ( 
            <div className="page-wrapper">
            <Helmet>
                <title>Invoice - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
              {/* Page Content */}
              <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Invoice</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/purple/app/main/dashboard">Dashboard</a></li>
                        <li className="breadcrumb-item active">Invoice</li>
                      </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-white">CSV</button>
                        <button className="btn btn-white">PDF</button>
                        <button className="btn btn-white"><i className="fa fa-print fa-lg" /> Print</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6 m-b-20">
                            <img src={Applogo} className="inv-logo" alt="" />
                            <ul className="list-unstyled">
                              <li>Dreamguy's Technologies</li>
                              <li>3864 Quiet Valley Lane,</li>
                              <li>Sherman Oaks, CA, 91403</li>
                              <li>GST No:</li>
                            </ul>
                          </div>
                          <div className="col-sm-6 m-b-20">
                            <div className="invoice-details">
                              <h3 className="text-uppercase">Invoice #INV-0001</h3>
                              <ul className="list-unstyled">
                                <li>Date: <span>March 12, 2019</span></li>
                                <li>Due date: <span>April 25, 2019</span></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 col-lg-7 col-xl-8 m-b-20">
                            <h5>Invoice to:</h5>
                            <ul className="list-unstyled">
                              <li><h5><strong>Barry Cuda</strong></h5></li>
                              <li><span>Global Technologies</span></li>
                              <li>5754 Airport Rd</li>
                              <li>Coosada, AL, 36020</li>
                              <li>United States</li>
                              <li>888-777-6655</li>
                              <li><a href="#">barrycuda@example.com</a></li>
                            </ul>
                          </div>
                          <div className="col-sm-6 col-lg-5 col-xl-4 m-b-20">
                            <span className="text-muted">Payment Details:</span>
                            <ul className="list-unstyled invoice-payment-details">
                              <li><h5>Total Due: <span className="text-right">$8,750</span></h5></li>
                              <li>Bank name: <span>Profit Bank Europe</span></li>
                              <li>Country: <span>United Kingdom</span></li>
                              <li>City: <span>London E1 8BF</span></li>
                              <li>Address: <span>3 Goodman Street</span></li>
                              <li>IBAN: <span>KFH37784028476740</span></li>
                              <li>SWIFT code: <span>BPT4E</span></li>
                            </ul>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>ITEM</th>
                                <th className="d-none d-sm-table-cell">DESCRIPTION</th>
                                <th>UNIT COST</th>
                                <th>QUANTITY</th>
                                <th className="text-right">TOTAL</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Android Application</td>
                                <td className="d-none d-sm-table-cell">Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
                                <td>$1000</td>
                                <td>2</td>
                                <td className="text-right">$2000</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Ios Application</td>
                                <td className="d-none d-sm-table-cell">Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
                                <td>$1750</td>
                                <td>1</td>
                                <td className="text-right">$1750</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Codeigniter Project</td>
                                <td className="d-none d-sm-table-cell">Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
                                <td>$90</td>
                                <td>3</td>
                                <td className="text-right">$270</td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Phonegap Project</td>
                                <td className="d-none d-sm-table-cell">Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
                                <td>$1200</td>
                                <td>2</td>
                                <td className="text-right">$2400</td>
                              </tr>
                              <tr>
                                <td>5</td>
                                <td>Website Optimization</td>
                                <td className="d-none d-sm-table-cell">Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
                                <td>$200</td>
                                <td>2</td>
                                <td className="text-right">$400</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <div className="row invoice-payment">
                            <div className="col-sm-7">
                            </div>
                            <div className="col-sm-5">
                              <div className="m-b-20">
                                <div className="table-responsive no-border">
                                  <table className="table mb-0">
                                    <tbody>
                                      <tr>
                                        <th>Subtotal:</th>
                                        <td className="text-right">$7,000</td>
                                      </tr>
                                      <tr>
                                        <th>Tax: <span className="text-regular">(25%)</span></th>
                                        <td className="text-right">$1,750</td>
                                      </tr>
                                      <tr>
                                        <th>Total:</th>
                                        <td className="text-right text-primary"><h5>$8,750</h5></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="invoice-info">
                            <h5>Other information</h5>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero, eu finibus sapien interdum vel</p>
                          </div>
                        </div>
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

export default Invoice;
