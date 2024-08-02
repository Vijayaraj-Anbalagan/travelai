import React from 'react';
import { signup } from '@/components/component/signup';

const LoginPage: React.FC = () => {
    return (
        <div>
            <h1 className='mb-12'></h1>
            {signup()}
        </div>
    );
};

export default LoginPage;