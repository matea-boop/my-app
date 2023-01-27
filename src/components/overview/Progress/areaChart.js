import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import { useSelector } from "react-redux";

export const AreaChartProgress = () => {
  const listOfDates = [];
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const percentage = ["0%", "20%", "40%", "60%", "80%", "100%"];
  const tasks = useSelector((state) =>
    state.task.taskList.forEach((task) => listOfDates.push({}))
  );
  const taskLength = useSelector((state) => state.task.taskList.length);
  const listOfcompletedTasks = useSelector((state) =>
    state.task.taskList.filter((task) => task.status === "complete")
  );

  const completedTasks = listOfcompletedTasks.length;
  const tasksDone =
    completedTasks === 0 ? 0 : (completedTasks / taskLength) * 100;

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={days}>
          <Area dataKey="id" />
          <XAxis />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
export default AreaChartProgress;

const Wrapper = styled.div``;
