import ds from 'lib/datasource';
import { ISurveyData } from 'redux/survey/types';

export const SurveyResource = {
    submitRating: (surveyData: ISurveyData, rating: number) =>
        ds.save<{ id: number }>(`/survey/${surveyData.type}/rating/`, {
            data: surveyData.data,
            rating,
        }),
    updateRating: (surveyId: number, rating: number) =>
        ds.update<{ id: number }>(`/survey/rating/${surveyId}`, {
            rating,
        }),
    submitText: (surveyData: ISurveyData, text: string) =>
        ds.save<{ id: number }>(`/survey/${surveyData.type}/text/`, {
            data: surveyData.data,
            text,
        }),
};
