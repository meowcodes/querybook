import { SurveyResource } from 'resource/survey';

import { ISurveyData, ThunkResult } from './types';

export function showSurvey(
    surveyData: ISurveyData
): ThunkResult<Promise<void>> {
    return async (dispatch) => {
        dispatch({
            type: '@@survey/SHOW_SURVEY',
            payload: {
                surveyData,
            },
        });
    };
}

export function hideSurvey(): ThunkResult<Promise<void>> {
    return async (dispatch) => {
        dispatch({
            type: '@@survey/HIDE_SURVEY',
            payload: null,
        });
    };
}

export function submitSurveyRating(rating: number): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        const state = getState();
        const resp = await SurveyResource.submitRating(
            state.survey.surveyData,
            rating
        );
        dispatch({
            type: '@@survey/SUBMIT_SURVEY_RATING',
            payload: {
                rating,
                surveyId: resp.data.id,
            },
        });
    };
}

export function updateSurveyRating(rating: number): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        const state = getState();
        const resp = await SurveyResource.updateRating(
            state.survey.surveyData.id,
            rating
        );
        dispatch({
            type: '@@survey/SUBMIT_SURVEY_RATING',
            payload: {
                rating,
                surveyId: resp.data.id,
            },
        });
    };
}

export function submitSurveyText(text: string): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        const state = getState();
        const resp = await SurveyResource.submitText(
            state.survey.surveyData,
            text
        );
        dispatch({
            type: '@@survey/SUBMIT_SURVEY_TEXT',
            payload: {
                text,
                surveyId: resp.data.id,
            },
        });
    };
}
