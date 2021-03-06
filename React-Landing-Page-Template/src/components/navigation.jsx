import React, { Component } from "react";
import { Link} from 'react-router-dom';
import axios from 'axios';


export class Navigation extends Component {
  state={
    data: '',
    id: ''
  }
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    }
    
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({
      showMenu: true,
    });
  }

  hideMenu(event) {
    event.preventDefault();

    this.setState({
      showMenu: false
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    
    if(prevProps.dataFromParent){
      this.state.data=prevProps.dataFromParent
    }
    else{
      this.state.data = prevState.data
    }
    
  }

  render() {
    console.log(this.state.data)
    console.log(this.props.dataFromParent)

    if(this.props.dataFromParent&&this.props.dataFromParent.name!=null){
      const user = "&name="+this.props.dataFromParent.name+"&id="+this.props.dataFromParent.id
      
      return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
          <div style={{float: 'right', marginRight: '10px'}}>{this.props.dataFromParent.name}님 환영합니다
              <button className = "LogoutButton" style={{marginLeft:'10px', borderRadius: '15px', padding: '3px 8px', outline: 'none'}}>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="/"  className = "login-button">로그아웃</Link>
                </button></div>
          <div className="container">
          
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                {" "}
                <span className="sr-only">Toggle navigation</span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
              </button>
              <Link className="navbar-brand page-scroll" to={{pathname: "/", state: this.props.dataFromParent}}>
              For Vegan
              </Link>{" "}
            </div>
  
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right" style={{verticalalign: 'middle'}}>
              <li>
                <a href="/#features?" className="page-scroll">
                채식주의자란
                </a>
              </li>
              <li>
                <a href="/#about" className="page-scroll">
                  포 비건
                </a>
              </li>
              <li>
                <a href="/#team" className="page-scroll">
                  개발자
                </a>
              </li>
              <li>
                <a href="/#contact" className="page-scroll">
                  문의
                </a>
              </li>
              <li>
                <a href="/Restaurant"  className="page-scroll" onMouseEnter={this.showMenu} onClick={this.hideMenu}>
                  국내 비건 식당
                </a>
              </li>
              <li>
                <Link to={{
                        pathname : "/recipe",
                        state : this.props.dataFromParent}} className="page-scroll">
                  요리 레시피
                </Link>
              </li>
              <li>
                <Link style={{marginRight: '100px'}} to={{pathname: "/mypage",state : this.props.dataFromParent}}  className="page-scroll">
                  마이 페이지
                </Link>
              </li>
              </ul>
            </div>
            {
            this.state.showMenu
              ? (
                <div >
                  <ul style={{margin: '10px', textAlign: 'right'}}>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area="+user} className="page-scroll" style={{color: 'black'}}>
                        전국
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=서울"+user} className="page-scroll" style={{color: 'black'}}>
                        서울
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=인천"+user} className="page-scroll" style={{color: 'black'}}>
                        인천
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=경기"+user} className="page-scroll" style={{color: 'black'}}>
                        경기
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=강원도"+user} className="page-scroll" style={{color: 'black'}}>
                        강원도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=충청북도"+user} className="page-scroll" style={{color: 'black'}}>
                        충청북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=충청남도"+user} className="page-scroll" style={{color: 'black'}}>
                        충청남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=전라북도"+user} className="page-scroll" style={{color: 'black'}}>
                        전라북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=전라남도"+user} className="page-scroll" style={{color: 'black'}}>
                        전라남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=경상북도"+user} className="page-scroll" style={{color: 'black'}}>
                        경상북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=경상남도"+user} className="page-scroll" style={{color: 'black'}}>
                        경상남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=제주"+user} className="page-scroll" style={{color: 'black'}}>
                        제주
                      </a>
                    </li>
                  </ul>
                </div>
                
              )
              : (
                null
              )
          }
          </div>
        </nav>
      );
    }
    else if(this.state.data&&this.state.data.name!=null){
      const user = "&name="+this.state.data.name+"&id="+this.state.data.id
      return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
          <div style={{float: 'right', marginRight: '10px'}}>{this.state.data.name}님 환영합니다
              <button className = "LogoutButton" style={{marginLeft:'10px', borderRadius: '15px', padding: '3px 8px', outline: 'none'}}>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to="/"  className = "login-button">로그아웃</Link>
                </button></div>
          <div className="container">
          
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                {" "}
                <span className="sr-only">Toggle navigation</span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
              </button>
              <Link className="navbar-brand page-scroll" to={{pathname: "/", state: this.props.data}}>
              For Vegan
              </Link>{" "}
            </div>
  
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right" style={{verticalalign: 'middle'}}>
              <li>
                <a href="/#features?"  className="page-scroll">
                채식주의자란
                </a>
              </li>
              <li>
                <a href="/#about" className="page-scroll">
                  포 비건
                </a>
              </li>
              <li>
                <a href="/#team" className="page-scroll">
                  개발자
                </a>
              </li>
              <li>
                <a href="/#contact" className="page-scroll">
                  문의
                </a>
              </li>
              <li>
                <a href="/Restaurant"  className="page-scroll" onMouseEnter={this.showMenu} onClick={this.hideMenu}>
                  국내 비건 식당
                </a>
              </li>
              <li>
                <Link to={{
                        pathname : "/recipe",
                        state : this.state.data}} className="page-scroll">
                  요리 레시피
                </Link>
              </li>
              <li>
                <Link style={{marginRight: '100px'}} to={{pathname: "/mypage",state : this.state.data}}  className="page-scroll">
                  마이 페이지
                </Link>
              </li>
              </ul>
            </div>
            {
            this.state.showMenu
              ? (
                <div >
                  <ul style={{margin: '10px', textAlign: 'right'}}>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area="+user} className="page-scroll" style={{color: 'black'}}>
                        전국
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=서울"+user} className="page-scroll" style={{color: 'black'}}>
                        서울
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=인천"+user} className="page-scroll" style={{color: 'black'}}>
                        인천
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=경기"+user} className="page-scroll" style={{color: 'black'}}>
                        경기
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=강원도"+user} className="page-scroll" style={{color: 'black'}}>
                        강원도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=충청북도"+user} className="page-scroll" style={{color: 'black'}}>
                        충청북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=충청남도"+user} className="page-scroll" style={{color: 'black'}}>
                        충청남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=전라북도"+user} className="page-scroll" style={{color: 'black'}}>
                        전라북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=전라남도"+user} className="page-scroll" style={{color: 'black'}}>
                        전라남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=경상북도"+user} className="page-scroll" style={{color: 'black'}}>
                        경상북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=경상남도"+user} className="page-scroll" style={{color: 'black'}}>
                        경상남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href={"/Restaurant?area=제주"+user} className="page-scroll" style={{color: 'black'}}>
                        제주
                      </a>
                    </li>
                  </ul>
                </div>
                
              )
              : (
                null
              )
          }
          </div>
        </nav>
      );
    }
    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <button className = "LoginButton" style={{float: 'right', marginRight: '10px', borderRadius: '15px', padding: '3px 8px', outline: 'none'}}>
          <Link style={{ textDecoration: 'none', color: 'black' }}  to="/login"  className = "login-button">로그인</Link>
        </button>
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="navbar-brand page-scroll" href="/">
              For Vegan
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right" style={{verticalalign: 'middle'}}>
              <li>
                <a href="/#features" className="page-scroll">
                채식주의자란
                </a>
              </li>
              <li>
                <a href="/#about" className="page-scroll">
                  포 비건
                </a>
              </li>
              <li>
                <a href="/#team" className="page-scroll">
                  개발자
                </a>
              </li>
              <li>
                <a href="/#contact" className="page-scroll">
                  문의
                </a>
              </li>
              <li>
                <a href="/Restaurant"  className="page-scroll" onMouseEnter={this.showMenu} onClick={this.hideMenu}>
                  국내 비건 식당
                </a>
              </li>
              <li>
                <Link to="/recipe" className="page-scroll">
                  요리 레시피
                </Link>
              </li>
            </ul>
          </div>
          {
            this.state.showMenu
              ? (
                <div >
                  <ul style={{margin: '10px', textAlign: 'right'}}>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=" className="page-scroll" style={{color: 'black'}}>
                        전국
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=서울" className="page-scroll" style={{color: 'black'}}>
                        서울
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=인천" className="page-scroll" style={{color: 'black'}}>
                        인천
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=경기" className="page-scroll" style={{color: 'black'}}>
                        경기
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=강원도" className="page-scroll" style={{color: 'black'}}>
                        강원도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=충청북도" className="page-scroll" style={{color: 'black'}}>
                        충청북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=충청남도" className="page-scroll" style={{color: 'black'}}>
                        충청남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=전라북도" className="page-scroll" style={{color: 'black'}}>
                        전라북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=전라남도" className="page-scroll" style={{color: 'black'}}>
                        전라남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=경상북도" className="page-scroll" style={{color: 'black'}}>
                        경상북도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=경상남도" className="page-scroll" style={{color: 'black'}}>
                        경상남도
                      </a>
                    </li>
                    <li style={{textAlign: 'center', display: 'inline-block', margin: '15px'}}>
                      <a href="/Restaurant?area=제주" className="page-scroll" style={{color: 'black'}}>
                        제주
                      </a>
                    </li>
                  </ul>
                </div>
                
              )
              : (
                null
              )
          }
        </div>
      </nav>
    );
  }
}

export default Navigation;
