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
import {
  authLoginApiCall,
  setUserProfileToReducer
} from '../stateManagement/auth/AuthActionCreators';
import { fetchUserProfileAPIGet } from '../common/apiCall/api';
import { setHeaders } from '../common/apiCall/axiosSetup';
import { DASHBOARD_SCREEN_URL, LOGIN_SCREEN_URL } from '../common/constantData/screenUrl';

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
});


const ContextSet = (props) => {
  const router = useRouter();
  const auth = useAuth();


  const featcUserProfile =()=>{
    fetchUserProfileAPIGet()
      .then((response)=>{
        props.setUserProfileToReducerProp(response?.data);
        props.setIsAuthenticatedProp({status: true});
        auth.signIn(response?.data)
            .then(r => {
              router.push(DASHBOARD_SCREEN_URL)
            }).catch((err)=>{
          console.log(err)
        })
    })
      .catch((err=>{
        auth.signOut()
        router.push(LOGIN_SCREEN_URL)

      }))
  }


  useEffect(  ()=>{
    if (props.isAuthenticated && props?.userProfile?.name){
     auth.signIn( props.userProfile).then(()=>{
      }).catch((err)=>{
       featcUserProfile();
      })
    }else{
      featcUserProfile();
    }
  },[])


  return <></>
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextSet);
