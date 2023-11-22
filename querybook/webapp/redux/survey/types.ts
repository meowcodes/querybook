import { Action } from 'redux';
import {
    ThunkAction,
    ThunkDispatch as UntypedThunkDispatch,
} from 'redux-thunk';

import { SurveyType } from 'const/survey';

import { IStoreState } from '../store/types';

export interface ISurveyData {
    type: SurveyType;
    // TODO: update with different data types
    data: Record<string, any>;
    id?: number;
    rating?: number;
    text?: string;
}

export interface ISurveyState {
    showSurvey: boolean;
    surveyData?: ISurveyData;
}

export interface IShowSurveyAction extends Action {
    type: '@@survey/SHOW_SURVEY';
    payload: {
        surveyData: ISurveyData;
    };
}
export interface IHideSurveyAction extends Action {
    type: '@@survey/HIDE_SURVEY';
    payload: null;
}

export interface ISubmitSurveyRatingAction extends Action {
    type: '@@survey/SUBMIT_SURVEY_RATING';
    payload: {
        rating: number;
        surveyId: number;
    };
}

export interface IUpdateSurveyRatingAction extends Action {
    type: '@@survey/UPDATE_SURVEY_RATING';
    payload: {
        rating: number;
        surveyId: number;
    };
}

export interface ISubmitSurveyTextAction extends Action {
    type: '@@survey/SUBMIT_SURVEY_TEXT';
    payload: {
        text: string;
        surveyId: number;
    };
}

export type SurveyAction =
    | IShowSurveyAction
    | IHideSurveyAction
    | ISubmitSurveyRatingAction
    | IUpdateSurveyRatingAction
    | ISubmitSurveyTextAction;

export type ThunkResult<R> = ThunkAction<
    R,
    IStoreState,
    undefined,
    SurveyAction
>;

export type ThunkDispatch = UntypedThunkDispatch<
    IStoreState,
    undefined,
    SurveyAction
>;
