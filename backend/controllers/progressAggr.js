const Task = require("../models/Task");

//aggregation for week/month progress

const getProgressStatistics = async (req, res) => {
  try {
    const group = {
      $group: {
        _id: "$date",
        date: {
          $first: "$date",
        },
        all: {
          $sum: {
            $cond: ["$date", 1, 0],
          },
        },
        checked: {
          $sum: {
            $cond: ["$status", 1, 0],
          },
        },
        notChecked: {
          $sum: {
            $cond: ["$status", 0, 1],
          },
        },
      },
    };
    const project = {
      $project: {
        date: "$date",
        checked: "$checked",
        notChecked: "$notChecked",
        all: "$all",
        percent: {
          $multiply: [
            {
              $divide: ["$checked", "$all"],
            },
            100,
          ],
        },
      },
    };
    const taskStats = await Task.aggregate([group, project]).exec(function(
      err,
      filteredTasks
    ) {
      if (filteredTasks) {
        res.json(filteredTasks);
      }
      if (err) {
        res.json({
          msg: "Error occured while filtering tasks",
          error: err,
          success: false,
        });
      }
    });

    const taskStatsi = await Task.aggregate([
      group,
      project,

      { $merge: { into: "progress" } },
    ]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getProgressStatistics,
};
