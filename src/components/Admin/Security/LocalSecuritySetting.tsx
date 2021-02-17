/* eslint-disable react/no-danger */
import React, { FC } from 'react';

// import { toastError } from '~/client/js/util/apiNotification';
// import { toArrayIfNot } from '~/utils/array-utils';
// import { withLoadingSppiner } from '../../SuspenseUtils';

import AdminLocalSecurityContainer from '~/client/js/services/AdminLocalSecurityContainer';

import LocalSecuritySettingContents from '~/components/Admin/Security/LocalSecuritySettingContents';

type Props = {
  // adminLocalSecurityContainer: AdminLocalSecurityContainer,
}

const retrieveErrors = null;
export const LocalSecuritySetting: FC<Props> = (props: Props) => {

  // TODO: improve following error handling by GW 5182

  // if (adminLocalSecurityContainer.state.registrationMode === adminLocalSecurityContainer.dummyRegistrationMode) {
  //   throw (async() => {
  //     try {
  //       await adminLocalSecurityContainer.retrieveSecurityData();
  //     }
  //     catch (err) {
  //       const errs = toArrayIfNot(err);
  //       toastError(errs);
  //       retrieveErrors = errs;
  //       adminLocalSecurityContainer.setState({ registrationMode: adminLocalSecurityContainer.dummyRegistrationModeForError });
  //     }
  //   })();
  // }

  // if (adminLocalSecurityContainer.state.registrationMode === adminLocalSecurityContainer.dummyRegistrationModeForError) {
  //   throw new Error(`${retrieveErrors.length} errors occured`);
  // }

  return <LocalSecuritySettingContents />;
};

/*
  Original codes
*/

/* eslint-disable react/no-danger */
// import React from 'react';
// import PropTypes from 'prop-types';

// import { withUnstatedContainers } from '../../UnstatedUtils';
// import { toastError } from '../../../util/apiNotification';
// import { toArrayIfNot } from '~/utils/array-utils';
// import { withLoadingSppiner } from '../../SuspenseUtils';

// import AdminLocalSecurityContainer from '../../../services/AdminLocalSecurityContainer';

// import LocalSecuritySettingContents from './LocalSecuritySettingContents';

// let retrieveErrors = null;
// function LocalSecuritySetting(props) {
//   const { adminLocalSecurityContainer } = props;
//   if (adminLocalSecurityContainer.state.registrationMode === adminLocalSecurityContainer.dummyRegistrationMode) {
//     throw (async() => {
//       try {
//         await adminLocalSecurityContainer.retrieveSecurityData();
//       }
//       catch (err) {
//         const errs = toArrayIfNot(err);
//         toastError(errs);
//         retrieveErrors = errs;
//         adminLocalSecurityContainer.setState({ registrationMode: adminLocalSecurityContainer.dummyRegistrationModeForError });
//       }
//     })();
//   }

//   if (adminLocalSecurityContainer.state.registrationMode === adminLocalSecurityContainer.dummyRegistrationModeForError) {
//     throw new Error(`${retrieveErrors.length} errors occured`);
//   }

//   // return <LocalSecuritySettingContents />;
// }

// LocalSecuritySetting.propTypes = {
//   adminLocalSecurityContainer: PropTypes.instanceOf(AdminLocalSecurityContainer).isRequired,
// };

// const LocalSecuritySettingWithUnstatedContainer = withUnstatedContainers(withLoadingSppiner(LocalSecuritySetting), [
//   AdminLocalSecurityContainer,
// ]);

// export default LocalSecuritySettingWithUnstatedContainer;
