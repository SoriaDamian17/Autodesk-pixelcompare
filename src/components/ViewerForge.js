import Grid from "@mui/material/Grid";
import { useEffect, useRef } from "react";
import viewerService from "../services/viewer";

var Autodesk = window.Autodesk;

const ViewerForge = () => {
  let viewer = null;
  const ViewerContainer = useRef(null);

  function getAccessToken(onSuccess) {
    viewerService.post("authentication/v1/authenticate").then((response) => {
      const { data } = response;
      if (data.access_token) {
        onSuccess(data.access_token, data.expires_in);
      }
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function initializerViewer() {
    console.log("inicialize");
    const options = {
      env: "AutodeskProduction2",
      language: "en",
      api: "streamingV2",
      config3d: {
        extensions: ["Autodesk.Viewing.PixelCompare"]
      },
      getAccessToken: (onSuccess) => getAccessToken(onSuccess),
      urn1:
        "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLm1YREtkbHdCU0xHWnN0eUlxRk42TWc_dmVyc2lvbj0x"
    };
    await Autodesk.Viewing.Initializer(options, async () => {
      viewer = new Autodesk.Viewing.GuiViewer3D(ViewerContainer.current, {});
      Autodesk.Viewing.Document.load(
        options.urn1,
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      );
      await viewer.start();
    });
  }

  function onDocumentLoadSuccess(doc) {
    const viewables = doc.getRoot().getDefaultGeometry();
    console.log("viewables", viewables);
    viewer.loadDocumentNode(doc, viewables).then(onLoadSuccess);
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
  }

  function onLoadSuccess() {
    viewer
      .loadExtension("Autodesk.Viewing.PixelCompare")
      .then(onPixelCompareExtensionLoaded);
  }

  function onPixelCompareExtensionLoaded(pixelCompareExt) {
    var offsetMode = false;
    /*
    const LeafletDiffModes = {
        NORMAL_DIFF: 0,
        MODEL_A_ONLY: 1,
        MODEL_B_ONLY: 2,
        SPLIT_VIEW: 3,
        HIGHLIGHT_A: 4,
        HIGHLIGHT_B: 5
    };
*/

    function onKeyDown(event) {
      if (!event.keyCode) return;
      if (event.keyCode < 49 || event.keyCode > 55) return;

      if (event.keyCode === 49) {
        offsetMode = !offsetMode;
        pixelCompareExt.setChangeOffsetMode(offsetMode);
      } else pixelCompareExt.setDiffMode(event.keyCode - 50);
    }
    window.addEventListener("keydown", onKeyDown);

    pixelCompareExt
      .compareModelWithCurrent(
        "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLm1YREtkbHdCU0xHWnN0eUlxRk42TWc_dmVyc2lvbj0x"
      )
      .then(function (result) {
        console.log(
          `compare models ${result ? "successful, yeah" : "failed, boo"}`
        );
      });
  }

  useEffect(() => {
    /*const link = document.createElement("link");
    link.id = "forgeViewerCss";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `https://developer.api.autodesk.com/modelderivative/v2/viewers/7./style.min.css`;
    document.getElementsByTagName("head")[0].appendChild(link);

    const config = document.createElement("script");
    config.id = "forgeViewerJs";
    config.src = `https://developer.api.autodesk.com/modelderivative/v2/viewers/7./viewer3D.min.js`;
    document.getElementsByTagName("head")[0].appendChild(config);*/

    // config.onload = () => {
    if (Autodesk) {
      initializerViewer();
    }
    // };

    /*document.getElementsByTagName("body")[0].classList.add("page-viewer");

    return () => {
      document.getElementById("forgeViewerCss")?.remove();
      document.getElementById("forgeViewerJs")?.remove();
      document.getElementsByTagName("body")[0].classList.remove("page-viewer");
    };*/
  }, [initializerViewer]);

  return (
    <Grid
      container
      direction="column"
      style={{ height: "60vh", border: "none" }}
    >
      <Grid
        item
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%"
        }}
      >
        <div ref={ViewerContainer} />
      </Grid>
    </Grid>
  );
};
export default ViewerForge;
