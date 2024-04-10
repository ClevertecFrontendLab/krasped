import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Grid, Image, Input } from "antd";
import { IExercise, ITraining, ITrainingReq, } from "@redux/api/training/training.types"
import noTrainingsPng from "@assets/imgs/noTrainings.png"
import { _Colors } from "@config/constants";


export const TrainingModal = ({ newAddedExercise, item, onBack, onOpenExersices  }: { newAddedExercise: IExercise[], item: ITraining, onOpenExersices: ()=>void, onBack: ()=>void }) => {

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();


  return (
    <div
      style={{
        position: "absolute",
        width: "241px",
        height: "240px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "100%",
          gap: "16px"
        }}>
        <div style={{
          paddingTop: "2px",
          paddingLeft: "12px",
          paddingRight: "12px",
          display: "flex", gap: "12px", fontSize: "14px", lineHeight: "18px"
        }}>
          <ArrowLeftOutlined data-test-id='modal-exercise-training-button-close' onClick={() => {onBack()}} />
          <div>{item.name}</div>
        </div>
        <Divider style={{ 
          backgroundColor: _Colors?.[item.name as keyof typeof _Colors] || "#EB2F96",
          margin: "17.5px 0 0" }} />
        {!item.exercises.length ?
          <div style={{
            display: "flex",
            height: "129px",
            width: "100%",
            justifyContent: "center",
            padding: "32px 0 16px 0"
          }}>
            <Image
              width={32}
              preview={false}
              src={noTrainingsPng}
              alt="no_Trainings"
            />
          </div> :
          <div style={{
            maxHeight: "129px",
            height: "100%",
            overflowY: "auto",
            width: "100%", display:
              "flex", gap: "8px", flexDirection: "column",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}>

            {(newAddedExercise).map((item, index) => (
              <div style={{
                display: "flex", width: "100%", justifyContent: "space-between"
              }} key={`${item.name}-${index}`}
                data-test-id={`modal-update-training-edit-button` + `${index}`}
              >

                <div style={{
                  color: "#8C8C8C"
                }}>{item.name}</div>
              </div>
            ))}
          </div>
        }
        <Divider style={{ margin: 0 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            justifyContent: "center",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "12px"
          }}>
          <Button
            type="default"
            style={{
              width: "100%",
              fontSize: "14px",
              height: "32px",
              lineHeight: "18px"
            }}
            onClick={() => {onOpenExersices()}}
            disabled={item?.isImplementation}
          >
            Добавить упражнения
          </Button>
        </div>
      </div>
    </div>
  )
}