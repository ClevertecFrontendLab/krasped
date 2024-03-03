import React, { useEffect } from 'react';
import { Grid, Layout } from 'antd';

import Main_page_light from "@assets/imgs/Main_page_light.png"

import s from './feedback-page.module.scss';
import { Navbar } from '@components/navbar';
import { useSelector } from 'react-redux';
import { RootState, history } from '@redux/configure-store';
import { FeedbackHeader } from './header/feedback-header';
import { FeedbackContent } from './content/feedback-content';
import { FeedbackFooter } from './footer/feedback-footer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetAllFeedbacksQuery } from '@api/feedback/feedback';
import { LoaderComponent } from '@components/loader/api-loader';
import { selectFeedbacks } from '@redux/feedbackSlice';
import { logout } from '@redux/userSlice';
// import { useGetMeQuery } from '@api/user/user';

const FeedbackPage: React.FC = () => {
  const feedbacks = useAppSelector(selectFeedbacks)
  const dispatch = useAppDispatch()
  const { isError, isLoading, error } = useGetAllFeedbacksQuery(null);
  // const { data, error, isLoading, refetch } = useGetMeQuery();
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');

  useEffect(() => {
    if (isError) {
      const customError = error as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push("/auth/login")
      }
      history.push('/result/error-feedbacks', {
        from: "feedbacks",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
      <Layout style={{ position: "relative" }}>
        <Navbar />
        <Layout style={{
          position: 'relative',
          transition: "padding-left 0.146s linear",
          paddingLeft: layoutPaddingLeft,
          minHeight: "100dvh",
          backgroundPosition: "center",
          backgroundImage: `url(${Main_page_light})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
          <LoaderComponent />
          <div style={{ height: (screens?.xs) ? "calc(100dvh - 186px)" : "calc(100dvh - 220px)", overflow: "auto", scrollbarWidth: "none" }}>
            <FeedbackHeader />
            <FeedbackContent data={feedbacks} />
          </div>
          {(!!feedbacks?.length) && <div style={{
            padding: (screens?.xs) ? "16px 16px 42px" : "20px 24px 48px",
            height: (screens?.xs) ? "186px" : "220px"
          }} >
            <FeedbackFooter />
          </div>}
        </Layout>
      </Layout >
    </div>
  );
};
export default FeedbackPage;
