import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { SurveyType, SurveyTypeToQuestion } from 'const/survey';
import { Dispatch, IStoreState } from 'redux/store/types';
import * as surveyActions from 'redux/survey/action';

import { SurveyToast } from './SurveyToast';

export const SurveyToastManager: React.FunctionComponent = () => {
    const dispatch: Dispatch = useDispatch();

    const { showSurvey, surveyData } = useSelector((state: IStoreState) => ({
        showSurvey: state.survey.showSurvey,
        surveyData: state.survey.surveyData,
    }));

    const [text, setText] = React.useState<string>('');
    const [toastId, setToastId] = React.useState<string>('');

    const hideSurvey = React.useCallback(() => {
        toast.dismiss(toastId);
        dispatch(surveyActions.hideSurvey());
    }, [dispatch, toastId]);

    const submitRating = React.useCallback(
        async (rating: number) => {
            await dispatch(surveyActions.submitSurveyRating(rating));
            toast.success('Thank you for your rating!');
        },
        [dispatch]
    );

    const updateRating = React.useCallback(
        (rating: number) => {
            dispatch(surveyActions.updateSurveyRating(rating));
            toast.success('Rating updated!');
        },
        [dispatch]
    );

    const submitText = React.useCallback(async () => {
        await dispatch(surveyActions.submitSurveyText(text));
        toast.success('Thank you for your feedback!');
        setText('');
    }, [dispatch, text]);

    const getQuestionText = React.useCallback(() => {
        const questionText = SurveyTypeToQuestion[surveyData?.type];
        if (surveyData?.type !== SurveyType.TABLE_TRUSTWORTHIESS) {
            return questionText;
        }
        return questionText.replace(
            '<table_name>',
            surveyData?.data?.table_name
        );
    }, [surveyData]);

    const onRating = React.useCallback(
        (rating: number) => {
            if (!toastId) {
                return;
            }
            if (surveyData?.id) {
                updateRating(rating);
            } else {
                submitRating(rating);
            }
        },
        [submitRating, surveyData?.id, toastId, updateRating]
    );

    // create toast
    React.useEffect(() => {
        if (showSurvey && !toastId) {
            const newToastId = toast.custom((t) => (
                <SurveyToast
                    questionText={getQuestionText()}
                    onRate={onRating}
                    onTextChange={(e) => setText(e.target.value)}
                    onSubmitText={submitText}
                    onDismiss={hideSurvey}
                />
            ));
            setToastId(newToastId);
        }
    }, [
        showSurvey,
        toastId,
        getQuestionText,
        onRating,
        submitText,
        hideSurvey,
    ]);

    // update toast
    React.useEffect(() => {
        if (showSurvey && toastId) {
            toast.custom(
                <SurveyToast
                    questionText={getQuestionText()}
                    onRate={onRating}
                    onTextChange={(val) => setText(val)}
                    onSubmitText={submitText}
                    onDismiss={hideSurvey}
                    rating={surveyData?.rating}
                    text={text}
                />,
                {
                    id: toastId,
                }
            );
        }
    }, [
        showSurvey,
        toastId,
        getQuestionText,
        onRating,
        submitText,
        hideSurvey,
        surveyData,
        text,
    ]);

    return null;
};
