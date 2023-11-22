import { produce } from 'immer';

import { ISurveyState, SurveyAction } from './types';

const initialState: ISurveyState = {
    showSurvey: false,
};

export default function surveyRecducer(
    state = initialState,
    action: SurveyAction
): ISurveyState {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@@survey/SHOW_SURVEY': {
                draft.showSurvey = true;
                draft.surveyData = action.payload.surveyData;
                return;
            }
            case '@@survey/HIDE_SURVEY': {
                draft.showSurvey = false;
                draft.surveyData = undefined;
                return;
            }
            case '@@survey/SUBMIT_SURVEY_RATING': {
                draft.surveyData = {
                    ...draft.surveyData,
                    id: action.payload.surveyId,
                    rating: action.payload.rating,
                };
                return;
            }
            case '@@survey/UPDATE_SURVEY_RATING': {
                draft.surveyData = {
                    ...draft.surveyData,
                    rating: action.payload.rating,
                };
                return;
            }
            case '@@survey/SUBMIT_SURVEY_TEXT': {
                draft.surveyData = {
                    ...draft.surveyData,
                    text: action.payload.text,
                };
                return;
            }
        }
    });
}
