import { IFeedbackReq } from "@redux/api/feedback/feedback.types"
import { Content } from "antd/lib/layout/layout"
import { CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, InfoCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { _AuthLogin, _Error, _ErrorUserExist, _Feedbacks, _Success } from "@config/constants";
import { history } from "@redux/configure-store";
import { Button, Form, Grid, Image, Modal, Rate, Result, Card, Switch, Tooltip, Drawer, Space, Radio, RadioChangeEvent } from "antd"
import { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useAddFeedbackMutation } from "@redux/api/feedback/feedback";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { logout, selectTariffList, selectUser } from "@redux/userSlice";
import FreePng from "@assets/imgs/freeTarif.png"
import ProPng from "@assets/imgs/proTarifActive.png"
import ProPngDisabled from "@assets/imgs/proTarifDisabled.png"
import { useUpdateTariffMutation, useUpdateUserMutation } from "@redux/api/user/user";
import dayjs from "dayjs";
import { ITariffAdd } from "@redux/api/user/user.types";
import { IPeriod } from "@redux/api/catalog/catalog.types";

export const SettingsContent = () => {
  const [addFeedbacks, { isError: addIsError, isSuccess: addSuccess, isLoading: addLoading, error: addError }] = useAddFeedbackMutation();
  const [updateUserTariff, { isError: tariffIsError, isSuccess: tariffSuccess, isLoading: tariffLoading, error: tariffError }] = useUpdateTariffMutation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch()
  const { useBreakpoint } = Grid;
  const user = useAppSelector(selectUser)
  const tariffs = useAppSelector(selectTariffList)
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const rating = Form.useWatch('rating', form);
  const [isOpenFeedbackFrom, setIsOpenFeedbackFrom] = useState(false)
  const [isfeedbackError, setIsfeedbackError] = useState(false)
  const [isfeedbackSuccess, setIsfeedbackSuccess] = useState(false)
  const [isActivateSuccess, setIsActivateSuccess] = useState(false)
  const [isShowActiveTariff, setIsShowActiveTariff] = useState<boolean>(false)
  const [isSendNotification, setIsSendNotification] = useState<boolean>(user?.sendNotification || false)
  const [isReady, setIsReady] = useState<boolean>(user?.readyForJointTraining || false)
  const [value, setValue] = useState<IPeriod>();

  const benifits = [
    { name: "Cтатистика за месяц", free: true, pro: true },
    { name: "Статистика за все время", free: false, pro: true },
    { name: "Совместные тренировки", free: true, pro: true },
    { name: "Участие в марафонах", free: false, pro: true },
    { name: "Приложение iOS", free: false, pro: true },
    { name: "Приложение Android", free: false, pro: true },
    { name: "Индивидуальный Chat GPT", free: false, pro: true },
  ]

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const closeFeedbackFrom = () => {
    setIsOpenFeedbackFrom(false)
    form.resetFields();
  }

  const sendFeedback = (values: IFeedbackReq) => {
    addFeedbacks(values)
  };

  const onChangeIsReady = (checked: boolean) => {
    setIsReady(checked);
    updateUser({ readyForJointTraining: checked })
  };

  const onChangeIsSendNotification = (checked: boolean) => {
    setIsSendNotification(checked);
    updateUser({ sendNotification: checked })
  };

  const closeAndLogout = () => {
    setIsActivateSuccess(false)
    dispatch(logout())
    history.push(_AuthLogin)
  }

  const updateTariff = () => {
    if (value && tariffs) {
      const payload: ITariffAdd = {
        days: value.days,
        tariffId: tariffs._id
      }
      updateUserTariff(payload)
    }
  };

  useEffect(() => {
    setIsSendNotification(user?.sendNotification || false)
    setIsReady(user?.readyForJointTraining || false)
  }, [])

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addLoading]);

  useEffect(() => {
    if (tariffSuccess) {
      setIsActivateSuccess(true)
      setIsShowActiveTariff(false)
    }
    if (tariffIsError) {
      const customError = tariffError as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tariffLoading]);


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
      <Modal centered
        data-test-id='tariff-modal-success'
        footer={null}
        closeIcon={<CloseOutlined />}
        bodyStyle={{ padding: "56px 32px" }}
        style={{ backdropFilter: 'blur(10px)' }}
        open={isActivateSuccess}
        onCancel={() => { closeAndLogout() }}>
        <div style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // padding: "56px 32px",
          gap: "29px"
        }}>
          <CheckCircleFilled
            style={{
              color: "#2F54EB",
              fontSize: "70px"
            }} />
          <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "8px",
          }}>
            <div
              style={{ fontSize: "24px", color: "#262626", fontWeight: 500, lineHeight: "21px" }}>
              Чек для оплаты у вас на почте
            </div>
            <div
              style={{ textAlign: "center", color: "#8C8C8C", fontSize: "14px", lineHeight: "18px", paddingBottom: "16px" }}
            >
              Мы отправили инструкцию для оплаты вам на e-mail
              <span
                style={{
                  fontWeight: 700
                }}
              >{user?.email}</span>. После подтверждения оплаты войдите
              в приложение заново.
            </div>
            <div
              style={{ color: "#8C8C8C", fontSize: "14px", lineHeight: "18px" }}
            >
              Не пришло письмо? Проверьте папку Спам.
            </div>

          </div>
        </div>

      </Modal>
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

              <Button size='large' onClick={() => { setIsfeedbackError(false); setIsOpenFeedbackFrom(true) }}
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
            <Button htmlType='submit'
              data-test-id='new-review-submit-button'
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
      {isShowActiveTariff && <Drawer
        data-test-id='tariff-sider'
        style={{
          zIndex: 1001
        }}
        maskStyle={{ background: "none" }}
        placement={"right"}
        closable={false}
        onClose={() => setIsShowActiveTariff(false)}
        open={isShowActiveTariff}
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
          <CloseOutlined onClick={() => setIsShowActiveTariff(false)} style={{ cursor: "pointer" }} />

        </div>
        {user?.tariff?.expired && <div
          style={{
            width: "100%",
            padding: "14px 0",
            display: "flex",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 500,
            color: "#030852",
            backgroundColor: "#F0F5FF",
            marginBottom: "48px",
          }}
        >{`Ваш PRO tarif активен до ${dayjs(user?.tariff?.expired).format("DD.MM")}`}</div>}
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "24px",
          }}>
            <div></div>
            <div style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "14px",
              width: "126px",
            }}>
              <div style={{
                backgroundColor: "#F0F0F0",
                padding: "2px 10px",
                fontSize: "12px",
              }}>FREE</div>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  backgroundColor: "#F0F5FF",
                  padding: "2px 10px",
                  color: "#1D39C4",
                  fontSize: "12px"
                }}
              >PRO{user?.tariff?.expired && <CheckCircleOutlined style={{ color: "#52C41A" }} />}</div>
            </div>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
            paddingBottom: "86px",
          }}>
            {benifits.map(item => {
              return (<div key={item.name} style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <div style={{ color: "#262626" }}>{item.name}</div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "14px",
                  width: "126px",
                }}>
                  {item.free ?
                    <CheckCircleFilled style={{ fontSize: "18px" }} /> :
                    <CloseCircleOutlined style={{ color: "#BFBFBF", fontSize: "18px" }} />}
                  <div>{item.pro ?
                    <CheckCircleFilled style={{ fontSize: "18px" }} /> :
                    <CheckCircleFilled style={{ fontSize: "18px" }} />}
                  </div>
                </div>
              </div>)
            })
            }
          </div>
        </div>
        {!user?.tariff?.expired && <div>
          <div

            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#262626",
              paddingBottom: "24px",
            }}>Cтоимость тарифа</div>
          {/* <div style={{
            display: "flex",
            justifyContent: "space-between",
          }}> */}
            <Radio.Group style={{width: "100%"}} onChange={onChange} value={value}>
            <div data-test-id='tariff-cost' style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "115px"
            }}>
              {tariffs?.periods?.map((item) => {
                return (<div style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }} key={item.text}>

                  <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#262626",
                  }}
                  >{item.text}</div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "14px",
                    width: "126px",
                  }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#262626",
                      }}>{`${(''+item.cost).replace(/\./g, ',')} $`}</div>
                      <Radio data-test-id={`tariff-${(''+item.cost).replace(/\./g, ',')}`} value={item}></Radio>
                  </div>
                </div>)
              })}
            </div></Radio.Group>
            {/* <div style={{
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
                {tariffs?.periods?.map(item => {

                  return (
                    <div
                      key={item.text}
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#262626",
                      }}>{`${item.cost} $`}</div>
                  )
                })}
              </div>
              <Radio.Group onChange={onChange} value={value}>
                <Space style={{
                  gap: 0,
                  justifyContent: "space-between",
                  height: "100%"
                }} direction="vertical">
                  {tariffs?.periods?.map((item) => {

                    return (<Radio key={item.text} value={item}></Radio>)
                  })}
                </Space>
              </Radio.Group>
            </div> */}
          {/* </div> */}
        </div>}
        {!user?.tariff?.expired && <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "36px"
          }}
        >
          <Button
            data-test-id='tariff-submit'
            style={{ width: screens.xs ? "100%" : "initial" }}
            disabled={!value} onClick={() => updateTariff()} type="primary" >
            Выбрать и оплатить
          </Button>
        </div>}
      </Drawer>}
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
            flexDirection: screens.xs ? "column" : "row",
            width: "100%",
            gap: screens.xs ? "12px" : "25px",
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
              width: screens.xs ? "100%" : "240px",
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
                onClick={() => setIsShowActiveTariff(true)} type="link" >
                Подробнее
              </Button>
            </div>
            <Image
              style={{
                maxHeight: screens.xs ? "200px" : "initial"
              }}
              preview={false} src={FreePng} />
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
            data-test-id='pro-tariff-card'
            bodyStyle={{
              padding: 0,
              display: "flex",
              height: "100%",
              flexDirection: "column",
              width: "100%",

            }}
            style={{
              width: screens.xs ? "100%" : "240px",
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
                onClick={() => setIsShowActiveTariff(true)} type="link" >
                Подробнее
              </Button>
            </div>
            <Image
              style={{
                maxHeight: screens.xs ? "200px" : "initial"
              }}
              preview={false} src={user?.tariff?.expired ? ProPng : ProPngDisabled} />
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flex: 1,
              }}
            >
              {user?.tariff?.expired ? <div style={{
                textAlign: "center",
                width: "75px",
                color: "#030852",
                fontWeight: 500,
                fontSize: "16px"
              }}>
                {`активен до ${dayjs(user?.tariff?.expired).format("DD.MM")}`}
              </div>
                :
                <Button data-test-id='activate-tariff-btn' onClick={() => setIsShowActiveTariff(true)} type="primary" >
                  Активировать
                </Button>
              }
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
                display: screens.xs ? "initial" : "flex",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "18px",
                gap: "8px"
              }}
            >
              Открыт для совместных тренировок
              <Tooltip
                style={{
                  fontSize: "14px",
                }}
                placement="bottomLeft" title={
                  "включеная функция позволит участвовать в совместных тренировках"
                }>
                <InfoCircleOutlined data-test-id='tariff-trainings-icon' style={{ fontSize: "16px", color: "#8C8C8C" }} />
              </Tooltip>            </div>
            <Switch data-test-id='tariff-trainings' onChange={(e) => onChangeIsReady(e)} checked={isReady} />
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
              <Tooltip

                style={{
                  fontSize: "14px",
                }}
                placement="bottomLeft" title={
                  "включеная функция позволит получать уведомления об активностях"
                }>
                <InfoCircleOutlined data-test-id='tariff-notifications-icon' style={{ fontSize: "16px", color: "#8C8C8C" }} />
              </Tooltip>
            </div>
            <Switch data-test-id='tariff-notifications' onChange={(e) => { setIsSendNotification(e); onChangeIsSendNotification(e) }} checked={isSendNotification} />
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
                gap: "8px",
                color: user?.tariff?.tariffId ? "initial" : "#BFBFBF"
              }}
            >
              Тёмная тема
              <Tooltip

                style={{
                  fontSize: "14px",
                }}
                placement={screens.xs ? undefined : "bottomLeft"} title={
                  "темная тема доступна для PRO tarif"
                }>
                <InfoCircleOutlined data-test-id='tariff-theme-icon' style={{ fontSize: "16px", color: "#8C8C8C" }} />
              </Tooltip>
            </div>
            <Switch data-test-id='tariff-theme' disabled={!user?.tariff?.tariffId} />
          </div>

        </div>

        <div style={{
          display: "flex",
          flexDirection: screens.xs ? "column" : "row",
          width: "100%",
          gap: screens.xs ? "16px" : "8px",
          alignItems: "center"
        }}>
          <Button
            style={{
              width: screens.xs ? "100%" : "initial",
            }}
            onClick={() => setIsOpenFeedbackFrom(true)} type="primary" >
            Написать отзыв
          </Button>
          <Button
            style={{
              width: screens.xs ? "100%" : "initial",
            }}
            type='link' onClick={() => history.push(_Feedbacks)} >
            Смотреть все отзывы
          </Button>
        </div>
      </div>
    </Content >
  )
}