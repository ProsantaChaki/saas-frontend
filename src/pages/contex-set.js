import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import getGlobalState from "../stateManagement/global/globalSelector";
import {
  testDataUpdate,
  setIsAuthenticated,
} from "../stateManagement/global/GlobalActionCreators";
import { connect } from "react-redux";
import { useAuth } from "src/hooks/use-auth";
import getAuthState from "../stateManagement/auth/AuthSelector";
import { authLoginApiCall } from '../stateManagement/auth/AuthActionCreators';

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  testDataUpdateProp: (data) => dispatch(testDataUpdate(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
});

const ContextSet = (props) => {
  const router = useRouter();
  const auth = useAuth();
  console.log(props,props.userProfile)


  useEffect(()=>{
    if (props.isAuthenticated) {
      console.log(props.userProfile)
     auth.signIn( props.userProfile).then(()=>{
        //router.push('/');
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      //auth.signOut()
    }
  },[props])

  return <></>
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextSet);
