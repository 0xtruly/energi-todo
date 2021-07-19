import React, {FC} from 'react';
import {
    School,
    Office,
    Home,
    Trash,
    Money,
    Smile
} from '../icons';

interface Props {
    name?: string;
    className?: string;
}
const Icons: FC<Props> = ({name, className}) => {
    switch (name) {
        case 'home':
            return <Home className={className} />;
        case 'office':
            return <Office className={className} />;
        case 'trash':
            return <Trash className={className} />;
        case 'school':
            return <School className={className} />;
        case 'money':
            return <Money className={className} />;
        case 'smile':
            return <Smile className={className} />;
    
        default:
            return <Home className={className} />;
    }
}
export default Icons;