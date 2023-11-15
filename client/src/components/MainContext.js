import { createContext,useReducer } from "react";  

const initialState = {  
    itemsIndex: {},
    companiesIndex: {},
};
 
const reducer = (state, action) => { 
     
   switch(action.type) {
    case 'temp-action': {
        return {
            
        }
    }
      

    default: {
              throw new Error(`Unrecognized action: ${action.type}`);
        }
    }

}

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });

  };
 
  const beginBooking = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
    
  };
  */
  return (
    <MainContext.Provider
      value={{
        state,
        actions: { 
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
};



export const MainContext = createContext();
