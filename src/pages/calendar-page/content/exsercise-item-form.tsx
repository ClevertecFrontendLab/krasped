import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Grid, Input } from "antd";
import { IExercise, ITraining, } from "@redux/api/training/training.types"


export const ExserciseItem = ({ itemObj, changeItemObj, isOldTraining, isImplementation, index }: { index: number, itemObj: IExercise, changeItemObj: (item: IExercise) => void, isOldTraining: () => ITraining | undefined, isImplementation: boolean }) => {
  const { name, replays, weight, approaches, isSelectedForDelete } = itemObj

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const chageValueAndSave = (value: Partial<IExercise>) => {
    if (isImplementation) return
    changeItemObj({ ...itemObj, ...value })
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "24px",
        gap: "8px"
      }}
    >
      <div><Input data-test-id={`modal-drawer-right-input-exercise${index}`} value={name} onChange={(e) => chageValueAndSave({ name: e.target.value })} size="small" style={{ height: "24px" }}
        addonAfter={(isOldTraining() && !isImplementation) && <Checkbox data-test-id={`modal-drawer-right-checkbox-exercise${index}`} checked={isSelectedForDelete} onChange={(e) => chageValueAndSave({ isSelectedForDelete: e.target.checked })} style={{ marginTop: "-5px" }}></Checkbox>}
        placeholder="Упражнение"></Input></div>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "6px" }}
        >
          <div
            style={{
              width: "120px",
              height: "24px",
              paddingLeft: "8px",
              backgroundColor: "#F0F0F0",
            }}
          >
            Подходы
          </div>
          <Input
            data-test-id={`modal-drawer-right-input-approach${index}`}
            value={approaches}
            onChange={(e) => chageValueAndSave({ approaches: +e.target.value })}
            size="small"
            type="number" style={{
              padding: 0,
              height: "24px !important",
              width: "120px",
            }} placeholder="1"

            addonBefore={<PlusOutlined onClick={() => chageValueAndSave({ approaches: itemObj.approaches + 1 })} style={{ lineHeight: "24px", fontSize: "10px" }} />}
          ></Input>
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <div
              style={{
                width: "89px",
                height: "24px",
                paddingLeft: "8px",
                backgroundColor: "#F0F0F0",
              }}
            >
              Вес, кг
            </div>

            <Input type="number"
              data-test-id={`modal-drawer-right-input-weight${index}`}
              value={weight}
              onChange={(e) => chageValueAndSave({ weight: +e.target.value })}
              style={{
                height: "24px",
                width: "89px",
              }} placeholder="0"></Input>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <div
              style={{
                height: "24px",
              }}
            >
            </div>
            <div
              style={{
                height: "24px",
                padding: "0 2px",
                color: "#BFBFBF"
              }}
            >x</div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <div
              style={{
                width: "89px",
                height: "24px",
                paddingLeft: "8px",
                backgroundColor: "#F0F0F0",
              }}
            >
              Количество
            </div>
            <Input type="number"
              data-test-id={`modal-drawer-right-input-quantity${index}`}
              value={replays}
              onChange={(e) => chageValueAndSave({ replays: +e.target.value })}
              style={{
                height: "24px",
                width: "89px",
              }} placeholder="1"></Input>
          </div>
        </div>
      </div>
    </div>
  )
}