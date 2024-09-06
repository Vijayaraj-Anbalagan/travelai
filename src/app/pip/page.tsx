'use client';
import React from 'react';
import { dashboard } from '@/components/component/dashboard';
import Navbar from '@/components/ui/NavBar';

const Pip: React.FC = () => {
    return (
        <div>
            <Navbar />
            {dashboard()}
        </div>
    );
};

export default Pip;