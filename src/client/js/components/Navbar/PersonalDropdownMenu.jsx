import React, { useCallback, useState } from 'react';

import { UncontrolledTooltip, DropdownMenu, DropdownItem } from 'reactstrap';

import { useTranslation } from '~/i18n';
import { useCurrentUser } from '~/stores/context';
import { usePreferDrawerModeByUser, usePreferDrawerModeOnEditByUser } from '~/stores/ui';
import { useInterceptorManager } from '~/stores/interceptor';

import {
  isUserPreferenceExists,
  isDarkMode as isDarkModeByUtil,
  applyColorScheme,
  removeUserPreference,
  updateUserPreference,
  updateUserPreferenceWithOsSettings,
} from '../../util/color-scheme';

import UserPicture from '../User/UserPicture';

import SidebarDrawerIcon from '../Icons/SidebarDrawerIcon';
import SidebarDockIcon from '../Icons/SidebarDockIcon';
import MoonIcon from '../Icons/MoonIcon';
import SunIcon from '../Icons/SunIcon';


/* eslint-disable react/prop-types */
const IconWithTooltip = ({
  id, label, children, additionalClasses,
}) => (
  <>
    <div id={id} className={`px-2 grw-icon-container ${additionalClasses != null ? additionalClasses : ''}`}>{children}</div>
    <UncontrolledTooltip placement="bottom" fade={false} target={id}>{label}</UncontrolledTooltip>
  </>
);
/* eslint-enable react/prop-types */


const PersonalDropdownMenu = (props) => {

  const { t } = useTranslation();
  const { data: interceptorManager } = useInterceptorManager();
  const { data: user } = useCurrentUser();

  const [useOsSettings, setOsSettings] = useState(!isUserPreferenceExists());
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeByUtil());
  // const [useOsSettings, setOsSettings] = useState(isUserPreferenceExists != null ? !isUserPreferenceExists() : true);
  // const [isDarkMode, setIsDarkMode] = useState(isDarkModeByUtil != null ? isDarkModeByUtil() : false);

  const { data: preferDrawerModeByUser, mutate: mutatePreferDrawerModeByUser } = usePreferDrawerModeByUser();
  const { data: preferDrawerModeOnEditByUser, mutate: mutatePreferDrawerModeOnEditByUser } = usePreferDrawerModeOnEditByUser();

  const logoutHandler = useCallback(() => {
    const context = {
      user,
      currentPagePath: decodeURIComponent(window.location.pathname),
    };
    interceptorManager.process('logout', context);

    window.location.href = '/logout';
  }, [user, interceptorManager]);

  const preferDrawerModeSwitchModifiedHandler = (bool) => {
    mutatePreferDrawerModeByUser(bool);
  };

  const preferDrawerModeOnEditSwitchModifiedHandler = (bool) => {
    mutatePreferDrawerModeOnEditByUser(bool);
  };

  const followOsCheckboxModifiedHandler = (bool) => {
    if (bool) {
      removeUserPreference();
    }
    else {
      updateUserPreferenceWithOsSettings();
    }
    applyColorScheme();

    // update states
    setOsSettings(bool);
    setIsDarkMode(isDarkModeByUtil());
  };

  const userPreferenceSwitchModifiedHandler = (bool) => {
    updateUserPreference(bool);
    applyColorScheme();

    // update state
    setIsDarkMode(isDarkModeByUtil());
  };

  return (
    <DropdownMenu right>

      <div className="px-4 pt-3 pb-2 text-center">
        <UserPicture user={user} size="lg" noLink noTooltip />

        <h5 className="mt-2">
          {user.name}
        </h5>

        <div className="my-2">
          <i className="icon-user icon-fw"></i>{user.username}<br />
          <i className="icon-envelope icon-fw"></i><span className="grw-email-sm">{user.email}</span>
        </div>

        <div className="btn-group btn-block mt-2" role="group">
          <a className="btn btn-sm btn-outline-secondary col" href={`/user/${user.username}`}>
            <i className="icon-fw icon-home"></i>{ t('personal_dropdown.home') }
          </a>
          <a className="btn btn-sm btn-outline-secondary col" href="/me">
            <i className="icon-fw icon-wrench"></i>{ t('personal_dropdown.settings') }
          </a>
        </div>
      </div>

      <DropdownItem divider />

      {/* Sidebar Mode */}
      <DropdownItem header>{t('personal_dropdown.sidebar_mode')}</DropdownItem>
      <form className="px-4">
        <div className="form-row justify-content-center">
          <div className="form-group col-auto mb-0 d-flex align-items-center">
            <IconWithTooltip id="iwt-sidebar-drawer" label="Drawer">
              <SidebarDrawerIcon />
            </IconWithTooltip>
            <div className="custom-control custom-switch custom-checkbox-secondary ml-2">
              <input
                id="swSidebarMode"
                className="custom-control-input"
                type="checkbox"
                checked={!preferDrawerModeByUser}
                onChange={e => preferDrawerModeSwitchModifiedHandler(!e.target.checked)}
              />
              <label className="custom-control-label" htmlFor="swSidebarMode"></label>
            </div>
            <IconWithTooltip id="iwt-sidebar-dock" label="Dock">
              <SidebarDockIcon />
            </IconWithTooltip>
          </div>
        </div>
      </form>

      {/* Sidebar Mode on Editor */}
      <DropdownItem header>{t('personal_dropdown.sidebar_mode_editor')}</DropdownItem>
      <form className="px-4">
        <div className="form-row justify-content-center">
          <div className="form-group col-auto mb-0 d-flex align-items-center">
            <IconWithTooltip id="iwt-sidebar-editor-drawer" label="Drawer">
              <SidebarDrawerIcon />
            </IconWithTooltip>
            <div className="custom-control custom-switch custom-checkbox-secondary ml-2">
              <input
                id="swSidebarModeOnEditor"
                className="custom-control-input"
                type="checkbox"
                checked={!preferDrawerModeOnEditByUser}
                onChange={e => preferDrawerModeOnEditSwitchModifiedHandler(!e.target.checked)}
              />
              <label className="custom-control-label" htmlFor="swSidebarModeOnEditor"></label>
            </div>
            <IconWithTooltip id="iwt-sidebar-editor-dock" label="Dock">
              <SidebarDockIcon />
            </IconWithTooltip>
          </div>
        </div>
      </form>

      <DropdownItem divider />

      {/* Color Mode */}
      <DropdownItem header>{t('personal_dropdown.color_mode')}</DropdownItem>
      <form className="px-4">
        <div className="form-row">
          <div className="form-group col-auto">
            <div className="custom-control custom-checkbox">
              <input
                id="cbFollowOs"
                className="custom-control-input"
                type="checkbox"
                checked={useOsSettings}
                onChange={e => followOsCheckboxModifiedHandler(e.target.checked)}
              />
              <label className="custom-control-label text-nowrap" htmlFor="cbFollowOs">{t('personal_dropdown.use_os_settings')}</label>
            </div>
          </div>
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-auto mb-0 d-flex align-items-center">
            <IconWithTooltip id="iwt-light" label="Light" additionalClasses={useOsSettings ? 'grw-icon-container-muted' : ''}>
              <SunIcon />
            </IconWithTooltip>
            <div className="custom-control custom-switch custom-checkbox-secondary ml-2">
              <input
                id="swUserPreference"
                className="custom-control-input"
                type="checkbox"
                checked={isDarkMode}
                disabled={useOsSettings}
                onChange={e => userPreferenceSwitchModifiedHandler(e.target.checked)}
              />
              <label className="custom-control-label" htmlFor="swUserPreference"></label>
            </div>
            <IconWithTooltip id="iwt-dark" label="Dark" additionalClasses={useOsSettings ? 'grw-icon-container-muted' : ''}>
              <MoonIcon />
            </IconWithTooltip>
          </div>
        </div>
      </form>

      <DropdownItem divider />

      <DropdownItem onClick={logoutHandler}><i className="icon-fw icon-power"></i>{ t('Sign out') }</DropdownItem>
    </DropdownMenu>
  );

};

export default PersonalDropdownMenu;
