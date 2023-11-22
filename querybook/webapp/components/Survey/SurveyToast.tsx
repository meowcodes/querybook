import { Star } from 'lucide-react';
import * as React from 'react';

import { TextButton } from 'ui/Button/Button';
import { ResizableTextArea } from 'ui/ResizableTextArea/ResizableTextArea';

import './SurveyToast.scss';

export const SURVEY_DISPLAY_DURATION = 300000;

interface IProps {
    questionText: string;
    onRate: (rating: number) => void;
    onTextChange: (e: any) => void;
    onSubmitText: () => void;
    onDismiss: () => void;
    rating?: number;
    text?: string;
}

export const SurveyToast: React.FunctionComponent<IProps> = ({
    questionText,
    rating,
    onRate,
    text,
    onTextChange,
    onSubmitText,
    onDismiss,
}) => (
    <div className="SurveyToast p16">
        <div>{questionText} </div>
        <fieldset className="RatingStars mv16">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((idx) => (
                <>
                    <input
                        key={`input${5 - idx}`}
                        type="radio"
                        value={5 - idx}
                        checked={5 - idx === rating}
                        onChange={() => null}
                    />
                    <label key={`label${5 - idx}`}>
                        <Star
                            key={`star${5 - idx}`}
                            onClick={() => onRate(5 - idx)}
                        />
                    </label>
                </>
            ))}
        </fieldset>
        {rating ? (
            <div className="SurveyText mb8">
                <ResizableTextArea
                    value={text}
                    onChange={onTextChange}
                    autoResize={false}
                    rows={2}
                />
            </div>
        ) : null}
        <div className="ButtonRow">
            {rating && text ? (
                <TextButton onClick={onSubmitText}>Submit Feedback</TextButton>
            ) : null}
            <TextButton onClick={onDismiss}>Dismiss</TextButton>
        </div>
    </div>
);
