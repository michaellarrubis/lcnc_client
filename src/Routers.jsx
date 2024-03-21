import React from 'react';
import _ from 'lodash';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Inject Import Page Index!

import PageNotFound from '@basePages/404';
import AccessDenied from '@basePages/401';
import Login from '@basePages/Login';
import Home from '@basePages/Home';
import MainView from 'src/layouts/base/MainView';
import PrivateRoute from '@baseComponents/PrivateRoute';
import UsersIndex from '@basePages/admin/users/UsersIndex';
import UserGroup from '@basePages/admin/users/UserGroup';
import Information from '@basePages/user/information/Information';
import ForgotPassword from '@basePages/password/ForgotPassword';
import ForgotPasswordSent from '@basePages/password/ForgotPasswordSent';
import CreatePassword from '@basePages/password/CreatePassword';
import PasswordReset from '@basePages/password/PasswordReset';
import ActivateAccount from '@basePages/account/ActivateAccount';
import CompanyInformation from '@basePages/companyInformation';
import CostCenter from '@basePages/costCenter/Index';
import Department from '@basePages/costCenter/Department/Index';
import Division from '@basePages/costCenter/Division/Index';
import Section from '@basePages/costCenter/Section/Index';
import SubSection from '@basePages/costCenter/SubSection/Index';

const Routers = () => {
  const userInfo = useSelector(({ user }) => user.user);

  return (
    <Routes>
      <Route path="page-not-found" element={<PageNotFound />} />
      <Route path="access-denied" element={<AccessDenied />} />
      {_.isEmpty(userInfo?.user) ? (
        <>
          <Route path="*" element={<Login />} />
          <Route path="forgot-password/sent" element={<ForgotPasswordSent />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="create-password" element={<CreatePassword />} />
          <Route path="password-reset" element={<PasswordReset />} />
          <Route path="activate-account" element={<ActivateAccount />} />
        </>
      ) : (
        <Route
          path="/*"
          element={
            <MainView>
              <Routes>
                {/* New Version */}
                <Route path="/">
                  {/* <Route index element={<Navigate to="/" />} /> */}
                  <Route index path="/" element={<Home />} />
                  <Route path="my-account" element={<Information />} />
                </Route>

                {/* New Version */}
                <Route path="/">
                  <Route index element={<Navigate to="/users" />} />
                  {/* <Route path="group" element={<UserGroup />} /> */}
                  <Route path="users">
                    <Route
                      index
                      element={
                        <PrivateRoute
                          element={<UsersIndex menuCode="ST01" />}
                        />
                      }
                    />
                  </Route>
                  <Route path="users-access">
                    <Route
                      index
                      element={
                        <PrivateRoute element={<UserGroup menuCode="ST02" />} />
                      }
                    />
                  </Route>
                  <Route path="company-information">
                    <Route
                      index
                      element={
                        <PrivateRoute
                          element={<CompanyInformation menuCode="ST03" />}
                        />
                      }
                    />
                  </Route>
                  <Route path="cost-center">
                    <Route
                      index
                      element={
                        <PrivateRoute
                          element={<CostCenter menuCode="CC01" />}
                        />
                      }
                    />
                    <Route
                      path="division"
                      element={
                        <PrivateRoute element={<Division menuCode="CC02" />} />
                      }
                    />
                    <Route
                      path="department"
                      element={
                        <PrivateRoute
                          element={<Department menuCode="CC03" />}
                        />
                      }
                    />
                    <Route
                      path="section"
                      element={
                        <PrivateRoute element={<Section menuCode="CC04" />} />
                      }
                    />
                    <Route
                      path="sub-section"
                      element={
                        <PrivateRoute
                          element={<SubSection menuCode="CC05" />}
                        />
                      }
                    />
                  </Route>
                </Route>
                <Route
                  path="*"
                  element={<Navigate replace to="/page-not-found" />}
                />
              </Routes>
            </MainView>
          }
        />
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;
