function quizEmailTemplate(OTP) {
  let div = `
  <html
  dir="ltr"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <title>Email Temp</title>
    <style type="text/css">
      .rollover:hover .rollover-first {
        max-height: 0px !important;
        display: none !important;
      }
      .rollover:hover .rollover-second {
        max-height: none !important;
        display: block !important;
      }
      .rollover span {
        font-size: 0px;
      }
      u + .body img ~ div div {
        display: none;
      }
      #outlook a {
        padding: 0;
      }
      span.MsoHyperlink,
      span.MsoHyperlinkFollowed {
        color: inherit;
        mso-style-priority: 99;
      }
      a.es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      .es-button-border:hover > a.es-button {
        color: #ffffff !important;
      }
      @media only screen and (max-width: 600px) {
        .es-m-p0t {
          padding-top: 0px !important;
        }
        .es-m-p50r {
          padding-right: 50px !important;
        }
        .es-m-p0b {
          padding-bottom: 0px !important;
        }
        .es-m-p50l {
          padding-left: 50px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        p,
        a {
          line-height: 150% !important;
        }
        h1,
        h1 a {
          line-height: 120% !important;
        }
        h2,
        h2 a {
          line-height: 120% !important;
        }
        h3,
        h3 a {
          line-height: 120% !important;
        }
        h4,
        h4 a {
          line-height: 120% !important;
        }
        h5,
        h5 a {
          line-height: 120% !important;
        }
        h6,
        h6 a {
          line-height: 120% !important;
        }
        h1 {
          font-size: 30px !important;
          text-align: left;
        }
        h2 {
          font-size: 24px !important;
          text-align: left;
        }
        h3 {
          font-size: 20px !important;
          text-align: left;
        }
        h4 {
          font-size: 24px !important;
          text-align: left;
        }
        h5 {
          font-size: 20px !important;
          text-align: left;
        }
        h6 {
          font-size: 16px !important;
          text-align: left;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 24px !important;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
        }
        .es-header-body h4 a,
        .es-content-body h4 a,
        .es-footer-body h4 a {
          font-size: 24px !important;
        }
        .es-header-body h5 a,
        .es-content-body h5 a,
        .es-footer-body h5 a {
          font-size: 20px !important;
        }
        .es-header-body h6 a,
        .es-content-body h6 a,
        .es-footer-body h6 a {
          font-size: 16px !important;
        }
        .es-menu td a {
          font-size: 14px !important;
        }
        .es-header-body p,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock a {
          font-size: 12px !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3,
        .es-m-txt-c h4,
        .es-m-txt-c h5,
        .es-m-txt-c h6 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3,
        .es-m-txt-r h4,
        .es-m-txt-r h5,
        .es-m-txt-r h6 {
          text-align: right !important;
        }
        .es-m-txt-j,
        .es-m-txt-j h1,
        .es-m-txt-j h2,
        .es-m-txt-j h3,
        .es-m-txt-j h4,
        .es-m-txt-j h5,
        .es-m-txt-j h6 {
          text-align: justify !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3,
        .es-m-txt-l h4,
        .es-m-txt-l h5,
        .es-m-txt-l h6 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-m-txt-r .rollover:hover .rollover-second,
        .es-m-txt-c .rollover:hover .rollover-second,
        .es-m-txt-l .rollover:hover .rollover-second {
          display: inline !important;
        }
        .es-m-txt-r .rollover span,
        .es-m-txt-c .rollover span,
        .es-m-txt-l .rollover span {
          line-height: 0 !important;
          font-size: 0 !important;
        }
        .es-spacer {
          display: inline-table;
        }
        a.es-button,
        button.es-button {
          font-size: 18px !important;
          line-height: 120% !important;
        }
        a.es-button,
        button.es-button,
        .es-button-border {
          display: inline-block !important;
        }
        .es-m-fw,
        .es-m-fw.es-fw,
        .es-m-fw .es-button {
          display: block !important;
        }
        .es-m-il,
        .es-m-il .es-button,
        .es-social,
        .es-social td,
        .es-menu {
          display: inline-block !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }
        .es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }
        tr.es-desk-hidden {
          display: table-row !important;
        }
        table.es-desk-hidden {
          display: table !important;
        }
        td.es-desk-menu-hidden {
          display: table-cell !important;
        }
        .es-menu td {
          width: 1% !important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }
        .es-social td {
          padding-bottom: 10px;
        }
        .h-auto {
          height: auto !important;
        }
        .es-m-w0 {
          width: 0px !important;
        }
        .es-text-1385,
        .es-text-1385 p,
        .es-text-1385 a,
        .es-text-1385 h1,
        .es-text-1385 h2,
        .es-text-1385 h3,
        .es-text-1385 h4,
        .es-text-1385 h5,
        .es-text-1385 h6,
        .es-text-1385 ul,
        .es-text-1385 ol,
        .es-text-1385 li,
        .es-text-1385 span,
        .es-text-1385 sup,
        .es-text-1385 sub,
        .es-text-1385 u,
        .es-text-1385 b,
        .es-text-1385 strong,
        .es-text-1385 em,
        .es-text-1385 i {
          font-size: 18px !important;
        }
        .es-text-1433,
        .es-text-1433 p,
        .es-text-1433 a,
        .es-text-1433 h1,
        .es-text-1433 h2,
        .es-text-1433 h3,
        .es-text-1433 h4,
        .es-text-1433 h5,
        .es-text-1433 h6,
        .es-text-1433 ul,
        .es-text-1433 ol,
        .es-text-1433 li,
        .es-text-1433 span,
        .es-text-1433 sup,
        .es-text-1433 sub,
        .es-text-1433 u,
        .es-text-1433 b,
        .es-text-1433 strong,
        .es-text-1433 em,
        .es-text-1433 i {
          font-size: 20px !important;
        }
        .es-text-6332,
        .es-text-6332 p,
        .es-text-6332 a,
        .es-text-6332 h1,
        .es-text-6332 h2,
        .es-text-6332 h3,
        .es-text-6332 h4,
        .es-text-6332 h5,
        .es-text-6332 h6,
        .es-text-6332 ul,
        .es-text-6332 ol,
        .es-text-6332 li,
        .es-text-6332 span,
        .es-text-6332 sup,
        .es-text-6332 sub,
        .es-text-6332 u,
        .es-text-6332 b,
        .es-text-6332 strong,
        .es-text-6332 em,
        .es-text-6332 i {
          font-size: 20px !important;
        }
        .es-text-5301,
        .es-text-5301 p,
        .es-text-5301 a,
        .es-text-5301 h1,
        .es-text-5301 h2,
        .es-text-5301 h3,
        .es-text-5301 h4,
        .es-text-5301 h5,
        .es-text-5301 h6,
        .es-text-5301 ul,
        .es-text-5301 ol,
        .es-text-5301 li,
        .es-text-5301 span,
        .es-text-5301 sup,
        .es-text-5301 sub,
        .es-text-5301 u,
        .es-text-5301 b,
        .es-text-5301 strong,
        .es-text-5301 em,
        .es-text-5301 i {
          font-size: 20px !important;
        }
        .es-text-3746,
        .es-text-3746 p,
        .es-text-3746 a,
        .es-text-3746 h1,
        .es-text-3746 h2,
        .es-text-3746 h3,
        .es-text-3746 h4,
        .es-text-3746 h5,
        .es-text-3746 h6,
        .es-text-3746 ul,
        .es-text-3746 ol,
        .es-text-3746 li,
        .es-text-3746 span,
        .es-text-3746 sup,
        .es-text-3746 sub,
        .es-text-3746 u,
        .es-text-3746 b,
        .es-text-3746 strong,
        .es-text-3746 em,
        .es-text-3746 i {
          font-size: 20px !important;
        }
      }
      @media screen and (max-width: 384px) {
        .mail-message-content {
          width: 414px !important;
        }
      }
    </style>
  </head>
  <body class="body" style="width: 100%; height: 100%; padding: 0; margin: 0">
    <div
      dir="ltr"
      class="es-wrapper-color"
      lang="en"
      style="background-color: #fca5a5"
    >
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill
            type="tile"
            color="#fca5a5"
            origin="0.5, 0"
            position="0.5, 0"
          ></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        cellspacing="0"
        cellpadding="0"
        role="none"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #fca5a5;
        "
      >
        <tr>
          <td valign="top" style="padding: 40px; margin: 0">
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-content-body"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                      border-top-right-radius: 20px;
                      border-top-left-radius: 20px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-right: 20px;
                          padding-left: 20px;
                        "
                      >
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              valign="top"
                              align="center"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0; font-size: 0"
                                  >
                                    <img
                                      src="https://eftfndj.stripocdn.email/content/guids/CABINET_db32046be751ac5bc20b2ac88c9628027917d68ba89ff5d3a25aef78ab2e7488/images/logobanner.png"
                                      alt=""
                                      class="adapt-img"
                                      width="560"
                                      style="
                                        display: block;
                                        font-size: 14px;
                                        border-radius: 20px;
                                        outline: none;
                                        text-decoration: none;
                                      "
                                    />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
              "
            >
              <tr>
                <td
                  align="center"
                  bgcolor="transparent"
                  style="padding: 0; margin: 0"
                >
                  <table
                    class="es-content-body"
                    cellpadding="0"
                    cellspacing="0"
                    bgcolor="#ffffff"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-right: 20px;
                          padding-left: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    class="es-text-1385"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      align="center"
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 22px !important;
                                        letter-spacing: 0;
                                        color: #333333;
                                        font-size: 18px;
                                      "
                                    >
                                      <strong
                                        >Please use Verification code on Quizify
                                        to attempt the quiz.</strong
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
              "
            >
              <tr>
                <td
                  align="center"
                  bgcolor="transparent"
                  style="padding: 0; margin: 0"
                >
                  <table
                    class="es-content-body"
                    cellpadding="0"
                    cellspacing="0"
                    bgcolor="#ffffff"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        class="es-m-p0b es-m-p0t es-m-p50l es-m-p50r"
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 10px;
                          padding-right: 100px;
                          padding-bottom: 10px;
                          padding-left: 100px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="esdev-mso-table"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            width: 400px;
                          "
                        >
                          <tr>
                            <!-- For OTP 1 -->
                            <td
                              class="esdev-mso-td es-m-w25"
                              valign="top"
                              style="
                                padding: 5px;

                                margin: 0;

                                /* background-color: aqua; */
                              "
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 95px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          class="es-text-3746"
                                          style="padding: 10px; margin: 0"
                                        >
                                          <p
                                            align="center"
                                            style="
                                              margin: 0;
                                              padding: 10px 5px;
                                              mso-line-height-rule: exactly;
                                              font-family: Roboto;
                                              line-height: 24px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 28px;
                                              border: solid 1px black;
                                              border-radius: 10px;
                                            "
                                          >
                                            <!-- OTP Code -->
                                            ${OTP[0]}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>

                            <td
                              class="es-m-w0"
                              style="padding: 0; margin: 0; width: 5px"
                            ></td>

                            <!-- For OTP 2 -->
                            <td
                              class="esdev-mso-td es-m-w25"
                              valign="top"
                              style="
                                padding: 5px;

                                margin: 0;

                                /* background-color: aqua; */
                              "
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 95px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          class="es-text-3746"
                                          style="padding: 10px; margin: 0"
                                        >
                                          <p
                                            align="center"
                                            style="
                                              margin: 0;
                                              padding: 10px 5px;
                                              mso-line-height-rule: exactly;
                                              font-family: Roboto;
                                              line-height: 24px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 28px;
                                              border: solid 1px black;
                                              border-radius: 10px;
                                            "
                                          >
                                            <!-- OTP Code -->
                                            ${OTP[1]}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>

                            <td
                              class="es-m-w0"
                              style="padding: 0; margin: 0; width: 5px"
                            ></td>

                            <!-- For OTP 3 -->
                            <td
                              class="esdev-mso-td es-m-w25"
                              valign="top"
                              style="
                                padding: 5px;

                                margin: 0;

                                /* background-color: aqua; */
                              "
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 95px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          class="es-text-3746"
                                          style="padding: 10px; margin: 0"
                                        >
                                          <p
                                            align="center"
                                            style="
                                              margin: 0;
                                              padding: 10px 5px;
                                              mso-line-height-rule: exactly;
                                              font-family: Roboto;
                                              line-height: 24px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 28px;
                                              border: solid 1px black;
                                              border-radius: 10px;
                                            "
                                          >
                                            <!-- OTP Code -->
                                            ${OTP[2]}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>

                            <td
                              class="es-m-w0"
                              style="padding: 0; margin: 0; width: 5px"
                            ></td>

                            <!-- For OTP 4 -->
                            <td
                              class="esdev-mso-td es-m-w25"
                              valign="top"
                              style="
                                padding: 5px;

                                margin: 0;

                                /* background-color: aqua; */
                              "
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 95px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          class="es-text-3746"
                                          style="padding: 10px; margin: 0"
                                        >
                                          <p
                                            align="center"
                                            style="
                                              margin: 0;
                                              padding: 10px 5px;
                                              mso-line-height-rule: exactly;
                                              font-family: Roboto;
                                              line-height: 24px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 28px;
                                              border: solid 1px black;
                                              border-radius: 10px;
                                            "
                                          >
                                            <!-- OTP Code -->
                                            ${OTP[3]}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
              "
            >
              <tr>
                <td
                  align="center"
                  bgcolor="transparent"
                  style="padding: 0; margin: 0"
                >
                  <table
                    class="es-content-body"
                    cellpadding="0"
                    cellspacing="0"
                    bgcolor="#ffffff"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-right: 20px;
                          padding-left: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <!-- Copy Button  -->
                                    <span
                                      class="es-button-border msohide"
                                      style="
                                        border-style: solid;
                                        border-color: #2cb543;
                                        background: #cb88ff;
                                        border-width: 0;
                                        display: inline-block;
                                        border-radius: 8px;
                                        width: auto;
                                        mso-hide: all;
                                      "
                                      ><a
                                        href="http://localhost:5000/send-email/copy-otp/${OTP}"
                                        class="es-button"
                                        style="
                                          mso-style-priority: 100 !important;
                                          text-decoration: none !important;
                                          mso-line-height-rule: exactly;
                                          color: #ffffff;
                                          font-size: 20px;
                                          padding: 10px 20px 10px 20px;
                                          display: inline-block;
                                          background: #cb88ff;
                                          border-radius: 8px;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          font-weight: normal;
                                          font-style: normal;
                                          line-height: 24px;
                                          width: auto;
                                          text-align: center;
                                          letter-spacing: 0;
                                          mso-padding-alt: 0;
                                          mso-border-alt: 10px solid #cb88ff;
                                        "
                                        >Copy Code</a
                                      ></span
                                    ><!--<![endif]-->
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                width: 100%;
                table-layout: fixed !important;
              "
            >
              <tr>
                <td
                  align="center"
                  bgcolor="transparent"
                  style="padding: 0; margin: 0"
                >
                  <table
                    class="es-content-body"
                    cellpadding="0"
                    cellspacing="0"
                    bgcolor="#ffffff"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                      border-bottom-left-radius: 20px;
                      border-bottom-right-radius: 20px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-right: 20px;
                          padding-left: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      align="center"
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 17px;
                                        letter-spacing: 0;
                                        color: #333333;
                                        font-size: 14px;
                                      "
                                    >
                                      <strong
                                        >If you didn't request this, you can
                                        ignore this email or&nbsp;</strong
                                      >
                                    </p>
                                    <p
                                      align="center"
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 17px;
                                        letter-spacing: 0;
                                        color: #333333;
                                        font-size: 14px;
                                      "
                                    >
                                      <strong
                                        >let us know at
                                        <a
                                          href="mailto:support@quizify.com"
                                          target="_blank"
                                          style="
                                            mso-line-height-rule: exactly;
                                            text-decoration: underline;
                                            color: #2cb543;
                                            font-size: 14px;
                                          "
                                          >support@quizify.com</a
                                        >.</strong
                                      >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 30px;
                                    "
                                  >
                                    <p
                                      align="center"
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 17px;
                                        letter-spacing: 0;
                                        color: #333333;
                                        font-size: 14px;
                                      "
                                    >
                                      <strong>Thanks!&nbsp;</strong>
                                    </p>
                                    <p
                                      align="center"
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 17px;
                                        letter-spacing: 0;
                                        color: #333333;
                                        font-size: 14px;
                                      "
                                    >
                                      <strong>Quizify Team</strong>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <script>
      function copyOTP() {
        navigator.clipboard.writeText(parseInt(OTP));
        console.log("Code Copied!");
      }
    </script>
  </body>
</html>
  
  
  `;

  return div;
}

module.exports = quizEmailTemplate;
