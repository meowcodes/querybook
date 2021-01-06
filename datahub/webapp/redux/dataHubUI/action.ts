import {
    ThunkResult,
    ISetConfirmationAction,
    IRemoveConfirmationAction,
    IAnnouncement,
    ISetSidebarTableId,
} from './types';

import localStore from 'lib/local-store';
import {
    DISMISSED_ANNOUNCEMENT_KEY,
    DismissedAnnouncementValue,
    DATA_DOC_NAV_SECTION_KEY,
    DataDocNavSectionValue,
} from 'lib/local-store/const';
import ds from 'lib/datasource';
import { ISetGlobalStateAction } from 'redux/globalState/types';

export function setConfirmation(props): ISetConfirmationAction {
    return {
        type: '@@dataHubUI/SET_CONFIRMATION',
        payload: props,
    };
}

export function removeConfirmation(): IRemoveConfirmationAction {
    return {
        type: '@@dataHubUI/REMOVE_CONFIRMATION',
    };
}

export function loadAnnouncements(): ThunkResult<Promise<IAnnouncement[]>> {
    return async (dispatch, state) => {
        const { data } = await ds.fetch('/announcement/');
        dispatch({
            type: '@@datahubUI/RECEIVE_ANNOUNCEMENTS',
            payload: data,
        });

        return data;
    };
}

export function loadDismissedAnnouncements(): ThunkResult<Promise<number[]>> {
    return async (dispatch, getState) => {
        const ids =
            (await localStore.get<DismissedAnnouncementValue>(
                DISMISSED_ANNOUNCEMENT_KEY
            )) || [];

        dispatch({
            type: '@@datahubUI/RECEIVE_DISMISSED_ANNOUNCEMENT_IDS',
            payload: ids,
        });

        return ids;
    };
}

export function dismissAnnouncement(
    itemId: number
): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        dispatch({
            type: '@@datahubUI/DISMISS_ANNOUNCEMENT_ID',
            payload: itemId,
        });

        await localStore.set(
            DISMISSED_ANNOUNCEMENT_KEY,
            getState().dataHubUI.dismissedAnnouncementIds
        );
    };
}

export function setSidebarTableId(id: number): ISetSidebarTableId {
    return {
        type: '@@datahubUI/SET_SIDEBAR_TABLE_ID',
        payload: id,
    };
}

export function setAppBlurred(blur: boolean): ISetGlobalStateAction {
    return {
        type: '@@globalState/SET_GLOBAL_STATE',
        payload: {
            key: 'appBlurred',
            value: blur,
        },
    };
}

export function setSessionExpired(): ThunkResult<void> {
    return (dispatch, getState) => {
        // Can't expire the session if user is not logged in
        if (!!getState().user.myUserInfo) {
            dispatch({
                type: '@@globalState/SET_GLOBAL_STATE',
                payload: {
                    key: 'sessionExpired',
                    value: true,
                },
            });
        }
    };
}

export function setDataDocNavSection(
    section: string,
    value: boolean
): ThunkResult<void> {
    return (dispatch, getState) => {
        dispatch({
            type: '@@datahubUI/SET_DATA_DOC_NAV_SECTION',
            payload: {
                section,
                value,
            },
        });

        localStore.set<DataDocNavSectionValue>(
            DATA_DOC_NAV_SECTION_KEY,
            getState().dataHubUI.dataDocNavigatorSectionOpen
        );
    };
}

export function setDataDocNavBoard(boardId: number, value: boolean) {
    return setDataDocNavSection(`board-${boardId}`, value);
}

export function getDataDocNavSectionConfigFromStore(): ThunkResult<void> {
    return async (dispatch) => {
        const payload =
            (await localStore.get<DataDocNavSectionValue>(
                DATA_DOC_NAV_SECTION_KEY
            )) ?? {};
        dispatch({
            type: '@@datahubUI/RECEIVE_DATA_DOC_NAV_SECTION',
            payload,
        });
    };
}
