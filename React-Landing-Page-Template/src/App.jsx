import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Home, Login, Register, Recipe, AddRecipe, Food, Restaurant, Mypage, Restaurant_Info} from 'pages';

export class App extends Component {

  render() {
    return (
      <div>
        <Route exact path = "/" component = {Home}/>
        <Switch>
          <Route path= "/login" component = {Login}/>
          <Route path= "/register" component = {Register}/>
          <Route path= "/recipe" component = {Recipe}/>
          <Route exact path= "/recipeadd" component = {AddRecipe}/>
          <Route path = "/food" component = {Food}/>
          <Route path= "/restaurant" component = {Restaurant} />
          <Route path= "/restaurant_info" component = {Restaurant_Info} />
          <Route path= "/mypage" component = {Mypage} />
        </Switch>
        
      </div>
    )
  }
}

export default App;

// BrowserRouter : history API를 사용해 URL과 UI를 동기화하는 라우터
// Route : 컴포넌트 속성에 설정된 URL과 현재 경로가 일치하면 해당 컴포넌트, 함수 렌더링
// Link : 'a' tag와 비슷함 to속성에 설정된 링크로 이동함, 기록이 history 스택에 저장됨
// Switch : 자식 컴포넌트 Route 또는 Redirect중 매치되는 첫 요소를 랜더링함
//   -> swith는 browserouter와 다르게 하나의 매칭되는 요소만 랜더링함
