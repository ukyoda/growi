import {
  FC, Fragment, useMemo, useCallback,
} from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { useTranslation } from '~/i18n';

import PageListIcon from '../../client/js/components/Icons/PageListIcon';
import TimeLineIcon from '../../client/js/components/Icons/TimeLineIcon';
import HistoryIcon from '../../client/js/components/Icons/HistoryIcon';
import AttachmentIcon from '../../client/js/components/Icons/AttachmentIcon';
import ShareLinkIcon from '../../client/js/components/Icons/ShareLinkIcon';
// import SeenUserInfo from '../../client/js/components/User/SeenUserInfo';

type Props = {
  isGuestUser: boolean;
  isSharedUser: boolean;
  onOpen?: (string)=>void;
}
type AccessoriesBtnListType = { name: string; Icon: JSX.Element; disabled: boolean; i18n: string; }


export const PageAccessoriesModalControl:FC<Props> = (props:Props) => {
  const { isGuestUser, isSharedUser, onOpen } = props;
  const { t } = useTranslation();

  const openModalHandler = useCallback((accessoryName:string):void => {
    if (onOpen == null) {
      return;
    }
    onOpen(accessoryName);
  }, [onOpen]);

  const accessoriesBtnList:AccessoriesBtnListType[] = useMemo(() => {
    return [
      {
        name: 'pagelist',
        Icon: <PageListIcon />,
        disabled: isSharedUser,
        i18n: t('page_list'),
      },
      {
        name: 'timeline',
        Icon: <TimeLineIcon />,
        disabled: isSharedUser,
        i18n: t('Timeline View'),
      },
      {
        name: 'pageHistory',
        Icon: <HistoryIcon />,
        disabled: isGuestUser || isSharedUser,
        i18n: t('History'),
      },
      {
        name: 'attachment',
        Icon: <AttachmentIcon />,
        disabled: false,
        i18n: t('attachment_data'),
      },
      {
        name: 'shareLink',
        Icon: <ShareLinkIcon />,
        disabled: isGuestUser || isSharedUser,
        i18n: t('share_links.share_link_management'),
      },
    ];
  }, [t, isGuestUser, isSharedUser]);

  return (
    <div className="grw-page-accessories-control d-flex flex-nowrap align-items-center justify-content-end justify-content-lg-between">
      {accessoriesBtnList.map((accessory) => {
      return (
        <Fragment key={accessory.name}>
          <div id={`shareLink-btn-wrapper-for-tooltip-for-${accessory.name}`}>
            <button
              type="button"
              className={`btn btn-link grw-btn-page-accessories ${accessory.disabled ? 'disabled' : ''}`}
              onClick={() => openModalHandler(accessory.name)}
            >
              {accessory.Icon}
            </button>
          </div>
          <UncontrolledTooltip placement="top" target={`shareLink-btn-wrapper-for-tooltip-for-${accessory.name}`} fade={false}>
            {accessory.disabled ? t('Not available for guest') : accessory.i18n}
          </UncontrolledTooltip>
        </Fragment>
      );
    })}
      <div className="d-flex align-items-center">
        <span className="border-left grw-border-vr">&nbsp;</span>
        {/* TODO GW-5193 display SeenUserInfo */}
        {/* <SeenUserInfo disabled={isSharedUser} /> */}
      </div>
    </div>
  );
};
