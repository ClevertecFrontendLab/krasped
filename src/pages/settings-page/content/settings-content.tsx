import { IFeedback, IFeedbackReq } from "@redux/api/feedback/feedback.types"
import { Content } from "antd/lib/layout/layout"
import { CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, GooglePlusOutlined, InfoCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { _AuthLogin, _Error, _ErrorUserExist, _Feedbacks, _Success } from "@config/constants";
import { useRegistrationMutation } from "@redux/api/auth/auth";
import { ILocationState, history } from "@redux/configure-store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input, Button, Form, Grid, Avatar, Image, Alert, Modal, Rate, Result, Card, Switch, Tooltip, Drawer, Space, Radio, RadioChangeEvent } from "antd"
import { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useAddFeedbackMutation } from "@redux/api/feedback/feedback";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { logout } from "@redux/userSlice";
import FreePng from "@assets/imgs/freeTarif.png"
import ProPng from "@assets/imgs/proTarifActive.png"
import ProPngDisabled from "@assets/imgs/proTarifDisabled.png"


type CustomError = FetchBaseQueryError & {
  status: number;
};


export const SettingsContent = ({ data, openFeedback }: { data: IFeedback[] | undefined, openFeedback: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [addFeedbacks, { isError: addIsError, isSuccess: addSuccess, isLoading: addLoading, error: addError }] = useAddFeedbackMutation();
  const dispatch = useAppDispatch()
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const rating = Form.useWatch('rating', form);
  const [isOpenFeedbackFrom, setIsOpenFeedbackFrom] = useState(false)
  const [isfeedbackError, setIsfeedbackError] = useState(false)
  const [isfeedbackSuccess, setIsfeedbackSuccess] = useState(false)
  const [isShowAddingExersice, setIsShowAddingExersice] = useState<boolean>(true)
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const closeFeedbackFrom = () => {
    setIsOpenFeedbackFrom(false)
    form.resetFields();
  }

  const sendFeedback = (values: IFeedbackReq) => {
    addFeedbacks(values)
  };

  useEffect(() => {
    if (addSuccess) {
      setIsfeedbackSuccess(true)
      closeFeedbackFrom()
    }
    if (addIsError) {
      const customError = addError as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
      setIsfeedbackError(true)
      setIsOpenFeedbackFrom(false)
      // closeFeedbackFrom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addLoading]);


  return (
    <Content style={{
      padding: "24px",
      boxSizing: "border-box",
      borderRadius: screens.xs ? 0 : "8px",
      backgroundColor: "white",
      display: "flex",
      height: "100%",
      overflow: 'initial',
      position: "relative",
    }}>
      <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isfeedbackError} onCancel={() => setIsfeedbackError(false)}>
        <Result
          style={{
            maxWidth: "539px",
            width: "100%",
            margin: 0,
            padding: screens.xs ? 0 : "64px 0",
            zIndex: 1,
            backgroundColor: "white"
          }}
          status="error"
          title={<span style={{ fontWeight: 500 }}>{"Данные не сохранились"}</span>}
          subTitle={
            <>
              <span>Что то пошло не так. </span>

              <span>Попробуйте ещё раз.</span>
            </>
          }
          extra={
            <div style={{
              display: "flex", gap: "8px"
            }}>

              <Button data-test-id='write-review-not-saved-modal' size='large' onClick={() => { setIsfeedbackError(false); setIsOpenFeedbackFrom(true) }}
                style={{ maxWidth: "369px", width: "100%", fontSize: "14px" }} type="primary" >
                Написать отзыв
              </Button>
              <Button size='large' onClick={() => { setIsfeedbackError(false) }}
                style={{ maxWidth: "369px", width: "100%", fontSize: "14px" }} type="default" >
                Закрыть
              </Button>
            </div>
          }
        />
      </Modal>
      <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isfeedbackSuccess} onCancel={() => setIsfeedbackSuccess(false)}>
        <Result
          style={{
            maxWidth: "539px",
            width: "calc(100% - 16px)",
            margin: "16px",
            padding: screens.xs ? "32px 16px" : "64px 0",
            zIndex: 1,
            backgroundColor: "white"
          }}
          status="success"
          title={<span style={{ fontWeight: 500 }}>{"Отзыв успешно опубликован"}</span>}

          extra={
            <Button size='large' onClick={() => { setIsfeedbackSuccess(false) }} style={{ maxWidth: "369px", width: "100%" }} type="primary" >
              Отлично
            </Button>
          }
        />
      </Modal>
      <Modal

        centered
        footer={
          <div style={{
            display: "flex",
            justifyContent: (screens?.xs) ? "center" : 'end'
          }}>
            <Button htmlType='submit' data-test-id='new-review-submit-button'
              disabled={!rating}
              size='large' onClick={() => { form.submit(); }}
              style={{ maxWidth: "369px", width: (screens?.xs) ? "100%" : "" }} type="primary" >
              Опубликовать
            </Button>
          </div>
        }
        // footer={null}
        style={{ backdropFilter: 'blur(10px)' }}
        bodyStyle={{ padding: "24px 24px 0" }}
        open={isOpenFeedbackFrom}
        title="Ваш отзыв"
        onCancel={() => closeFeedbackFrom()}
      >
        <Form
          name="feedbackFrom"
          onFinish={sendFeedback}
          form={form}
        >
          <Form.Item
            name="rating"
            rules={[{ required: true, message: 'Поставьте оценку' }]}
          >

            <Rate
              style={{ fontSize: 19, gap: "4px" }}
              character={({ index, value }) => {
                if (index !== undefined && value !== undefined && index < value) {
                  return <StarFilled />;
                }
                return <StarOutlined />;
              }}
            />
          </Form.Item>
          <Form.Item
            name="message"
          >
            <TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        data-test-id='modal-drawer-right'
        style={{
          zIndex: 1001
        }}
        maskStyle={{ background: "none" }}
        placement={"right"}
        closable={false}
        onClose={() => setIsShowAddingExersice(false)}
        open={isShowAddingExersice}
        key={"right"}
        width={screens.xs ? "100%" : 408}
        bodyStyle={{
          padding: screens.xs ? "24px 16px 12px" : "24px 32px 12",
        }}
      >
        <div style={{
          display: "flex", justifyContent: "space-between", paddingBottom: "16px"
        }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "26px",
            }}
          >
            Сравнить тарифы
          </div>
          <CloseOutlined data-test-id='modal-drawer-right-button-close' onClick={() => setIsShowAddingExersice(true)} style={{ cursor: "pointer" }} />

        </div>
        <div>Ваш PRO tarif активен до 02.07</div>
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div></div>
            <div style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "14px",
              width: "126px",
            }}>
              <div>free</div>
              <div
                style={{ display: "flex" }}
              >pro<CheckCircleOutlined style={{ color: "#52C41A" }} /></div>
            </div>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div>Статистика за месяц</div>
            <div style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "14px",
              width: "126px",
            }}>
              <CheckCircleFilled />
              <div><CloseCircleOutlined /></div>
            </div>
          </div>
        </div>
        <div>
          <div>Cтоимость тарифа</div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>6 месяцев</div>
              <div>9 месяцев</div>
              <div>12 месяцев</div>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "14px",
              width: "126px",
            }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                <div>5,5$</div>
                <div>8,5$</div>
                <div>10$</div>
              </div>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}></Radio>
                  <Radio value={2}></Radio>
                  <Radio value={3}></Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "36px"
          }}
        >
          <Button data-test-id='write-review' onClick={() => setIsOpenFeedbackFrom(true)} type="primary" >
            Активировать
          </Button>
        </div>
      </Drawer>
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "505px",
      }}>
        <div
          style={{
            fontSize: "20px",
            lineHeight: "26px",
            fontWeight: 500,
            paddingBottom: "16px"
          }}
        >Мой тариф</div>
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "25px",
            paddingBottom: "40px"
          }}
        >
          <Card
            bodyStyle={{
              padding: 0,
              display: "flex",
              height: "100%",
              flexDirection: "column",
              width: "100%",

            }}
            style={{
              width: "240px",
              height: "300px",
              boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)"
            }}>
            <div
              style={{
                height: "53px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <div
                style={{
                  color: "#262626",
                  fontSize: "16px",
                  fontWeight: 500
                }}
              >FREE tarif</div>
              <Button
                style={{
                  color: "#2F54EB",
                  fontSize: "14px",
                  padding: "4px 0"
                }}
                onClick={() => setIsOpenFeedbackFrom(true)} type="link" >
                Подробнее
              </Button>
            </div>
            <Image preview={false} src={FreePng} />
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                gap: "8px",
                color: "#030852",
                fontSize: "16px",
                fontWeight: 500,
                flex: 1,
              }}
            >
              активен
              <CheckOutlined style={{ color: "#000000D9" }} />
            </div>
          </Card>
          <Card
            bodyStyle={{
              padding: 0,
              display: "flex",
              height: "100%",
              flexDirection: "column",
              width: "100%",

            }}
            style={{
              width: "240px",
              height: "300px",
              boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)"
            }}>
            <div
              style={{
                height: "53px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <div
                style={{
                  color: "#262626",
                  fontSize: "16px",
                  fontWeight: 500
                }}
              >PRO tarif</div>
              <Button
                style={{
                  color: "#2F54EB",
                  fontSize: "14px",
                  padding: "4px 0"
                }}
                onClick={() => setIsOpenFeedbackFrom(true)} type="link" >
                Подробнее
              </Button>
            </div>
            <Image preview={false} src={ProPngDisabled} />
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flex: 1,
              }}
            >
              <Button data-test-id='write-review' onClick={() => setIsOpenFeedbackFrom(true)} type="primary" >
                Активировать
              </Button>
            </div>
          </Card>

        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "16px",
            paddingBottom: "112px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "18px",
                gap: "8px"
              }}
            >
              Открыт для совместных тренировок
              <Tooltip placement="bottomLeft" title={
                "включеная функция позволит участвовать в совместнях тренировках"
              }>
                <InfoCircleOutlined style={{ fontSize: "16px", color: "#8C8C8C" }} />
              </Tooltip>            </div>
            <Switch />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "18px",
                gap: "8px"
              }}
            >
              Уведомления
              <Tooltip placement="bottomLeft" title={
                "включеная функция позволит получать уведомления об активностях"
              }>
                <InfoCircleOutlined style={{ fontSize: "16px", color: "#8C8C8C" }} />
              </Tooltip>
            </div>
            <Switch />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "18px",
                gap: "8px"
              }}
            >
              Тёмная тема
              <Tooltip placement="bottomLeft" title={
                "темная тема доступна для PRO tarif"
              }>
                <InfoCircleOutlined style={{ fontSize: "16px", color: "#8C8C8C" }} />
              </Tooltip>
            </div>
            <Switch />
          </div>

        </div>

        <div style={{
          display: "flex",
          gap: "8px",
          alignItems: "center"
        }}>
          <Button data-test-id='write-review' onClick={() => setIsOpenFeedbackFrom(true)} type="primary" >
            Написать отзыв
          </Button>
          <Button data-test-id='see-reviews' type='link' onClick={() => history.push(_Feedbacks)} >
            Смотреть все отзывы
          </Button>
        </div>
      </div>
    </Content >
  )
}