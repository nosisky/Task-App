import todoApi from "../task";

const taskRouter = express.Router();

taskRouter.route("/").get(ctrl.getAll).post(ctrl.create);

taskRouter.route("/:id").delete(ctrl.remove).put(ctrl.update);

export default taskRouter;
