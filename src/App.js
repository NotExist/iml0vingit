import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      cart: {},
    }
  }

  handleRadioClick = (v) => {
    console.log(v.target.name);
    console.log(v.target.value);
    console.log(["zonea", "zoner"].includes(v.target.name) ? 1 : 2);
    let selected = [...this.state.selected];
    selected[["zonea", "zoner"].includes(v.target.name)?0:1] = v.target.value;
    this.setState({selected}, () => {console.log(this.state.selected);console.log(this.state);});
    
    // clear selection if zone changed

  }

  // addTo() {
  addTo = e => {
    // let cart = {...this.state.cart};

    this.state.selected.forEach(name => {
      //
      // console.log(this.state);
      this.setState(
        prevState => {
          // const {cart} = prevState;
          var cart = {...prevState.cart};
          // console.log(name);
          cart[name] = (cart[name]||0) + 1;
          // use value to catagory
          return {cart};
        },
        () => {
/*           setTimeout(() => {
            this.setState({ cart: !prevState.cart });
          }, 500); */
          console.log(this.state);
        }
      );
    });

    // this.setState({cart: {[this.state.selected[0]]: (this.state.cart[[this.state.selected[0]]]||0) + 1}});
    // this.setState({cart: {[this.state.selected[1]]: (this.state.cart[[this.state.selected[1]]]||0) + 1}});

    // this.setState((state, props) => ({cart: {[state.selected[0]]: (state.cart[[state.selected[0]]]||0) + 1,}}));
    // this.setState((state, props) => ({cart: {[state.selected[1]]: (state.cart[[state.selected[1]]]||0) + 1,}}));
    // console.log(this.state);
  }


  render() {
    const cartArray = Object.entries(this.state.cart);
    cartArray.forEach(([name,amount], i) => {
      var [menu_index, list_index] = name.split('_');
      var lookupname = menu[menu_index][list_index][0];
      cartArray[i][2] = lookupname;
    });
    const cartByZone = cartArray.slice().sort((a,b) => a[0].localeCompare(b[0]));
    const cartByName = cartArray.slice().sort((a,b) => a[2].localeCompare(b[2]));

    return (
      <div className="App row">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header> */}
        <ColoredArea name="甜心卡" color="Pink" className="col-md-6">
            <ColoredArea name="A區" color="LightBlue" className="col">
                <RadioGroup list={menu['zonea']} groupname="zonea" onClick={v => this.handleRadioClick(v)} />
            </ColoredArea>
            <ColoredArea name="B區" color="LightGreen" className="col">
                <RadioGroup list={menu['zoneb']} groupname="zoneb" onClick={v => this.handleRadioClick(v)} />
            </ColoredArea>
        </ColoredArea>
        <ColoredArea name="1+1" color="Grey" className="col-md-6">
            <ColoredArea name="紅區" color="Red" className="col">
                <RadioGroup list={menu['zoner']} groupname="zoner" onClick={v => this.handleRadioClick(v)} />
            </ColoredArea>
            <ColoredArea name="白區" color="White" className="col">
                <RadioGroup list={menu['zonew']} groupname="zonew" onClick={v => this.handleRadioClick(v)} />
            </ColoredArea>
        </ColoredArea>
        <button onClick={() => this.addTo()}>加入</button>
        <ColoredArea name="點餐區" color="Yellow">
          <ResultList list={cartByZone}/>
        </ColoredArea>
        <ColoredArea name="對餐區" color="Orange">
          <ResultList list={cartByName}/>
        </ColoredArea>
      </div>
    );
  }
}

function ColoredArea(prop) {
  return (
    <div
      style={{
        backgroundColor: prop.color,
      }}
      className={prop.className}
    >
      <div className="row">
        <h1>{prop.name}</h1>
      </div>
      <div className="row">
        {prop.children}
      </div>
    </div>
  )
}

function RadioGroup(prop) {
  return (
    prop.list.map(([itemname, price], i) => (
      <div key={prop.groupname +"_"+ i}>
        <label>
          <input
            type="radio"
            name={prop.groupname}
            value={prop.groupname +"_"+ i}
            // value={itemname}
            onClick={prop.onClick}
          />
          {itemname}:{price}
        </label>
      </div>
    ))
  )
}

function ResultList(prop) {
  return (
    prop.list.map(([name, value, cname]) => (
      <ItemResult name={cname} value={value} />
    ))
  )
}

function ItemResult(prop) {
  return (
    <div className="row">
      <div className="col">
        {prop.name}
      </div>
      <div className="col">
        {prop.value}
        <input type='checkbox' />
      </div>
    </div>
  )
}

export default App;

let menu = {
  zonea: [
    ["大杯可樂", 40],
    ["大杯可樂Zero", 40],
    ["大杯雪碧", 40],
    ["大杯檸檬茶", 40, "冰紅茶-大"],
    ["大杯無糖紅茶", 40, "冰無糖紅-大"],
    ["大杯無糖綠茶", 40, "冰綠茶-大"],
    ["四塊麥克雞塊", 49],
    ["六塊麥克雞塊", 60],
    ["十塊麥克雞塊", 100],
    ["大包薯條", 55, "薯條-大"],
    ["大杯玉米湯", 52],
    ["冰炫風", 55],
    ["中杯特選拿提(冰)", 75],
    ["中杯特選拿提(熱)", 90],
    ["大杯特選拿提(冰)", 75],
    ["大杯特選拿提(熱)", 90],
    ["中杯特選卡布奇諾", 75],
    ["大杯特選卡布奇諾", 90],
    ["特選黑咖啡(冰)", 65],
    ["特選黑咖啡(熱)", 65],
    ["中杯熱奶茶", 45],
    ["大杯冰奶茶", 45],
    ["中杯阿薩姆鮮奶茶(冰)", 75],
    ["中杯阿薩姆鮮奶茶(熱)", 75],
    ["大杯阿薩姆鮮奶茶(冰)", 90],
    ["大杯阿薩姆鮮奶茶(熱)", 90],
  ],
  zoneb: [
    ["大杯可樂", 0],
    ["大杯可樂Zero", 0],
    ["大杯雪碧", 0],
    ["大杯檸檬茶", 0],
    ["大杯無糖紅茶", 0],
    ["大杯無糖綠茶", 0],
    ["蛋捲冰淇淋", 0],
    ["特選黑咖啡(冰)", 0],
    ["特選黑咖啡(熱)", 0],
    ["小包薯條", 0, "薯條-小"],
    ["熱紅茶", 0],
    ["小杯冰奶茶", 0],
    ["小杯熱奶茶", 0],
  ],
  zoner: [
    ["四塊麥克雞塊49", 22, "C四塊雞塊"],
    ["法式芥末香雞堡45", 22, "C法式香雞堡"],
    ["吉士漢堡42", 50],
    ["小包薯條32", 22, "C薯條_小"],
    ["勁辣香雞翅45", 22, "C*勁辣翅"],
    ["酥嫩雞翅32", 50],
    ["大蛋捲冰淇淋30", 50],
    ["蘋果派32", 22, "C蘋果派"],
  ],
  zonew: [
    ["熱紅茶", 0],
    ["套餐咖啡", 0],
    ["小杯玉米湯", 28, "C玉米湯_小"],
    ["小杯可樂", 0],
    ["小杯可樂Zero", 0],
    ["小杯雪碧", 0],
    ["小杯檸檬茶", 0],
    ["小杯無糖紅茶", 28, "C冰無糖紅_小"],
    ["小杯無糖綠茶", 28, "C綠茶_小"],
  ]
}