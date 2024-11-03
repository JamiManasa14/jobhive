import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJobById = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (jobId) {
            fetchSingleJobById();
        }
    }, [jobId, dispatch]);
};

export default useGetJobById;
