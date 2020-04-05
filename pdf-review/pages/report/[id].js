import http from "isomorphic-fetch"
import React from "react"

import Annotator from "../../components/Annotator"
import PDFViewer from "../../components/PDFViewer"

const Page = ({ json, metadata, pdf, reportId }) => {
  const { firstName, lastName, reportLink, reportTitle } = metadata
  const title = reportTitle || `Report ${reportId}`

  return (
    <div>
      <h1>{title}</h1>
      <p>
        👋 Hey there, take a gander at this disclosure report filed by{" "}
        <strong>
          {firstName} {lastName}
        </strong>{" "}
        (<a href={`https://efdsearch.senate.gov/${reportLink}`}>Source</a>
        ). Can you help us digitize it by using the form to the right of the
        report?
      </p>
      <div className="report-annotator-container">
        <PDFViewer url={pdf} />
        <div className="annotator-container">
          <Annotator reportId={reportId} initialJson={json} />
        </div>
      </div>
    </div>
  )
}

Page.getInitialProps = async function({ req, query }) {
  const { apiHost } = req.locales
  const { id } = query
  const reportReq = await http(`${apiHost}/api/report/${id}`)
  const reportReqJson = await reportReq.json()
  const { json, metadata, pdf, reportId } = reportReqJson

  return {
    reportId,
    metadata: metadata || {},
    json,
    pdf
  }
}

export default Page
