import { createContext,useReducer } from "react";  

const initialState = {  
    itemsIndex: {},
    companiesIndex: {},
    items: [],
    companies: [],
    cart: [],
    categories: [],
    itemsCurrentPage: [],
    cartChanged: false,
    cartReceived: false,
  };
 
const reducer = (state, action) => { 
     
    switch(action.type) {
    case 'receive-item-info-from-server': {
      console.log("receive actdata",action.data);
      const _tempItemsIndex = {};
      const _tempItemsArray= []; 
      const _tempCategoriesArray = [];
      const _tempCompaniesArray = [];
      for (let _i = 0; _i < Object.keys(action.data).length; _i +=1)
      { 
        const _item = action.data[String(_i)]; 
         
        _tempItemsArray[_i] = {..._item};
        _tempItemsIndex[_item._id] = _i;  
        if (_tempCategoriesArray.indexOf(_item.category) === -1)
        {
          _tempCategoriesArray.push(_item.category);
        }

        if (_tempCategoriesArray.indexOf(_item.company) === -1)
        {
          _tempCompaniesArray.push(_item.company);
        }
        
      }     

        return {
          ...state,
          items: _tempItemsArray,
          itemsIndex: _tempItemsIndex,
          companies: _tempCompaniesArray,
          categories: _tempCategoriesArray,
        } 
        
    }
 
    case 'receive-page-info-from-server': {

      const _tempItemsArray= []; 
      for (let _i = 0; _i < Object.keys(action.data).length; _i +=1)
      { 
         const _item = action.data[String(_i)]; 
        _tempItemsArray[_i] = {..._item};
      }
      return {
        ...state, 
        itemsCurrentPage: _tempItemsArray,
      } 
    }

    case 'receive-cart-info-from-server': {
      const _tempItemsArray= []; 
      for (let _i = 0; _i < Object.keys(action.data).length; _i +=1)
      { 
         const _item = action.data[String(_i)]; 
        _tempItemsArray[_i] = {..._item};
      }
      
      console.log("cart items",_tempItemsArray);
      return {
        ...state, 
        cartReceived: true,
        cart: _tempItemsArray,
      } 
 
    }

    case 'add-to-cart': { 
      const _tempCart = state.cart.slice();
      _tempCart.push(action.data.item);
      return {
        ...state,  
        cart: _tempCart,
      } 

    }

    //data required: category string
    //sets itemsByCategory to 

    case 'get-items-by-category': {
        const _cat = action.data;
        const _tempItemCatArray = [];
        console.log("actdata",action.data);
        state.items.forEach(element => {
            if (element.category === _cat)
            {
              _tempItemCatArray.push(element);
            }
        });

        console.log("items by cat",_tempItemCatArray);

        return {
          ...state,
          itemsByCategory:_tempItemCatArray,
        };
    }
      

    default: {
              throw new Error(`Unrecognized action: ${action.type}`);
        }
    }

}

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


    //requestItemPage must be used in use effect, it's the first half that will obtain the item page data
    //once done it will add it to the itemsCurrentPage state
    const requestItemPage = (data) => {
            fetch('/items/'+String(data),
            {
            method: "GET",
            header: {
                "Content-Type":"application/json",
              } 
            }
          )
          .then(res => res.json())
          .then(data => receiveItemPageFromServer(data)) 
          .catch((error)=>{
            console.log(error); 
          }) 
    }
    
    const requestAllItems = () => {
        fetch('/items',
        {
        method: "GET",
        header: {
            "Content-Type":"application/json",
          } 
        }
      )
      .then(res => res.json())
      .then(data => receiveItemInfoFromServer(data)) 
      .catch((error)=>{
        console.log(error);  
      }) 
    }

    const requestCart = () => {
      fetch('/cart',
      {
      method: "GET",
      header: {
          "Content-Type":"application/json",
        } 
      }
    )
    .then(res => res.json())
    .then(data => receiveCartInfoFromServer(data)) 
    .catch((error)=>{
      console.log(error);  
    }) 
  }

  
  const receiveCartInfoFromServer = (data) => {
    dispatch({
      type: "receive-cart-info-from-server",
      data: data,
    }); 
  }; 

    const receiveItemPageFromServer = (data) => {
      dispatch({
        type: "receive-page-info-from-server",
        data: data,
      }); 
    }; 

    const receiveItemInfoFromServer = (data) => {
      dispatch({
        type: "receive-item-info-from-server",
        data: data,
      }); 
    }; 

    const inputSearch = (data) => {
      dispatch({
        type:"input-search",
        data: data,
      });

    }

    const cartUpdate = (data) => {
      console.log("hi");
    }

    const addToCart = (data) => { 
      fetch('/addToCart',
        {
        method: "POST", 
        body: JSON.stringify({"_id":data}),
        headers: {
            "Content-Type":"application/json",
          },
        })
        .then(res => res.json())
        .then((res) => { 
          dispatch({
        type: "add-to-cart",
        data: res,
        }) }  )  
      .catch((error)=>{
        console.log(error);  
        })
    }; 

    const checkoutPurchase = (data) => {
      dispatch({
        type: "checkout-purchase",
        data: data,
      }); 
    }; 
    //data required: category string
    const getItemsByCategory = (data) => {
      dispatch({
      type: "get-items-by-category",
      data: data,
      })
    }

  return (
    <MainContext.Provider
      value={{
        state,
        actions: { 
          requestAllItems,
          requestItemPage, 
          requestCart,
          cartUpdate,


          addToCart, 

          checkoutPurchase,

          getItemsByCategory,
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
};



export const MainContext = createContext();
