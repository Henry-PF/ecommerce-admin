import React from 'react'
import SideBar from '../../Home/Graficos/SideBar'

export default function Read() {
  return (
    <div className="wrapper">
      {/* Main Sidebar Container */}
      <SideBar></SideBar>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className=''>Read</h1>
              </div>
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
      <footer className="main-footer">

      </footer>
      {/* Control Sidebar */}
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>
      {/* /.control-sidebar */}
    </div>
  )
}
