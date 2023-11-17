import { createContext,useReducer } from "react";  

const initialState = {  
    itemsIndex: {},
    companiesIndex: {},
    items: [],
    companies: [],
    cart: [],
    categories: [],
    itemsByCategory: [],
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

    case 'receive-cart-info-from-server': {
      
      return {
        ...state,
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

    const addToCart = (data) => {
      dispatch({
        type: "add-to-cart",
        data: data,
      }); 
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
          addToCart,
          receiveItemInfoFromServer,
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
