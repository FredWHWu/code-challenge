import { Router } from "express";
import path from "path";
import { createIssue, deleteIssue, readAllIssue, updateIssue } from "./api/dataApi";

const routes = Router();

routes.get('/api/data', async (req, res) => {
  const data = await readAllIssue()
  res.json(data)
})

routes.post('/api/data', async (req, res) => {
  const response = await createIssue(req.body)
  res.send(response)
})

routes.put('/api/data', async (req, res) => {
  const response = await updateIssue(req.body)
  res.send(response)
})

routes.delete('/api/data/:id', async (req, res) => {
  const response = await deleteIssue(req.params.id)
  res.send(response)
})

routes.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build"));
});

export default routes;
