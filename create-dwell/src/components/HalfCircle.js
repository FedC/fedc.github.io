import * as styles from "./HalfCircle.module.scss";

const HalfCircle = () => {
  return (
    <svg
      width="256px"
      height="256px"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.halfCircle}
    >
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <g>
            <path className="orangeHalf" d="M128,0 C198.692448,0 256,57.307552 256,128 C256,198.692448 198.692448,256 128,256 L128,256 Z" fill="#F5AA0D"></path>
            <path d="M1.15140117,-2.4391511e-10 C2.52769057,-2.4391511e-10 3.8989067,0.0217212765 5.26472544,0.0648397152 C5.99214704,0.0878034776 6.71816075,0.116842558 7.44259396,0.151904066 L6.60051178,0.113893517 C7.09618475,0.134652913 7.59112912,0.15823117 8.08532928,0.184612674 L7.44259396,0.151904066 C8.15096092,0.18618799 8.85781671,0.226230176 9.56311553,0.271984822 L8.08532928,0.184612674 C8.61161383,0.212706913 9.1370544,0.243980199 9.66163215,0.278413674 L9.56311553,0.271984822 C10.2555001,0.316901685 10.9463842,0.36732373 11.6357245,0.423207626 L9.66163215,0.278413674 C10.4528086,0.330346782 11.2420223,0.389468421 12.0292086,0.455713897 L11.6357245,0.423207626 C12.3113277,0.477977874 12.9854481,0.537994457 13.6580447,0.60321658 L12.0292086,0.455713897 C12.9537074,0.533514869 13.8754098,0.621141725 14.794211,0.718489672 L13.6580447,0.60321658 C14.3382713,0.669178578 15.0169394,0.740464889 15.6940068,0.817033318 L14.794211,0.718489672 C15.4817075,0.791330638 16.1675797,0.869614285 16.8517836,0.953296709 L15.6940068,0.817033318 C16.3784571,0.894436654 17.0612716,0.977237928 17.7424068,1.06539355 L16.8517836,0.953296709 C17.4864259,1.03091743 18.1196329,1.11318311 18.7513696,1.20005872 L17.7424068,1.06539355 C18.429629,1.15433697 19.1151416,1.24873087 19.7989001,1.34853047 L18.7513696,1.20005872 C19.4033549,1.28971891 20.0537743,1.38428929 20.702589,1.48373133 L19.7989001,1.34853047 C20.4726955,1.4468759 21.1447875,1.55047064 21.8151331,1.65927187 L20.702589,1.48373133 C21.4632741,1.60031944 22.2217535,1.72360402 22.9779653,1.85352301 L21.8151331,1.65927187 C22.4727432,1.76600602 23.1286726,1.8777507 23.7828809,1.99446545 L22.9779653,1.85352301 C23.6343486,1.96629124 24.2890234,2.08405786 24.9419491,2.20678228 L23.7828809,1.99446545 C24.4638261,2.11595023 25.1429067,2.24281962 25.8200771,2.37502803 L24.9419491,2.20678228 C25.6536725,2.34055836 26.3633176,2.48022537 27.0708319,2.62573075 L25.8200771,2.37502803 C26.4682186,2.50156896 27.1146103,2.63300098 27.759212,2.76928408 L27.0708319,2.62573075 C27.6559939,2.74607352 28.2396984,2.87040998 28.8219155,2.99871036 L27.759212,2.76928408 C28.4544205,2.91626659 29.1475471,3.0688918 29.8385414,3.22710954 L28.8219155,2.99871036 C29.3929843,3.12455405 29.9626222,3.25421133 30.5308011,3.38765412 L29.8385414,3.22710954 C30.4902751,3.37633773 31.140112,3.53054098 31.78801,3.68967722 L30.5308011,3.38765412 C31.2441698,3.55519628 31.9552387,3.72870581 32.663952,3.90812718 L31.78801,3.68967722 C32.4322077,3.84790458 33.0744886,4.01100873 33.7148114,4.17894829 L32.663952,3.90812718 C33.3579642,4.08382671 34.0497175,4.26519535 34.73916,4.45218093 L33.7148114,4.17894829 C34.3577698,4.34757912 34.9987538,4.52108525 35.6377216,4.69942478 L34.73916,4.45218093 C35.3612497,4.62089959 35.981458,4.79419134 36.5997465,4.97201787 L35.6377216,4.69942478 C36.3041697,4.88543419 36.9684243,5.07670169 37.630438,5.27317974 L36.5997465,4.97201787 C37.1924628,5.14248956 37.7834149,5.31712867 38.3725689,5.49590144 L37.630438,5.27317974 C38.270328,5.46309174 38.9081244,5.65787186 39.5437843,5.85747717 L38.3725689,5.49590144 C39.0671762,5.70667294 39.7592843,5.9231903 40.4488377,6.1453982 L39.5437843,5.85747717 C40.1608867,6.0512552 40.7759754,6.2495808 41.3890112,6.45241469 L40.4488377,6.1453982 C41.0964339,6.35408541 41.7417769,6.56779173 42.3848208,6.78647132 L41.3890112,6.45241469 C42.0378961,6.66710989 42.684481,6.88685607 43.3287192,7.11160666 L42.3848208,6.78647132 C42.9740374,6.98684586 43.5613237,7.19139593 44.1466445,7.40008626 L43.3287192,7.11160666 C43.9577475,7.33105108 44.5845387,7.5552664 45.2090495,7.78420926 L44.1466445,7.40008626 C44.8086396,7.63611405 45.4681205,7.87743785 46.1250363,8.12400668 L45.2090495,7.78420926 C45.8217853,8.00883547 46.4323258,8.23801264 47.04063,8.47169981 L46.1250363,8.12400668 C46.7481416,8.35788499 47.368939,8.59648231 47.987385,8.8397551 L47.04063,8.47169981 C47.664683,8.71143704 48.2863825,8.95592081 48.9056842,9.20510693 L47.987385,8.8397551 C48.6165614,9.08724885 49.2433041,9.33958173 49.8675672,9.5967079 L48.9056842,9.20510693 C49.5116267,9.44891775 50.1152739,9.69723023 50.7165842,9.95000295 L49.8675672,9.5967079 C50.4929732,9.85430487 51.1158907,10.1167127 51.7362733,10.3838853 L50.7165842,9.95000295 C51.3245804,10.2055862 51.9301875,10.4657295 52.5333628,10.7303899 L51.7362733,10.3838853 C52.3301884,10.6396594 52.9217804,10.8998005 53.5110088,11.164268 L52.5333628,10.7303899 C53.1533665,11.0024343 53.7708008,11.2792515 54.3856192,11.560795 L53.5110088,11.164268 C54.0715571,11.4158627 54.6299663,11.671373 55.1862016,11.9307639 L54.3856192,11.560795 C54.9967838,11.8406652 55.6053634,12.1252058 56.2113124,12.4143709 L55.1862016,11.9307639 C55.7891611,12.2119439 56.3895661,12.497684 56.9873724,12.7879397 L56.2113124,12.4143709 C56.794856,12.6928439 57.3759598,12.9756057 57.9545832,13.2626158 L56.9873724,12.7879397 C57.5923927,13.0816982 58.1947512,13.3800819 58.7944018,13.6830451 L57.9545832,13.2626158 C58.5509339,13.5584189 59.1446499,13.8587345 59.7356864,14.1635179 L58.7944018,13.6830451 C59.373897,13.9758251 59.9508633,14.2728818 60.5252593,14.5741737 L59.7356864,14.1635179 C60.3114771,14.4604393 60.8847247,14.761601 61.4553881,15.0669616 L60.5252593,14.5741737 C61.1599912,14.907114 61.7915844,15.2452261 62.419983,15.5884539 L61.4553881,15.0669616 C62.0119963,15.3648013 62.5661459,15.6666356 63.1177986,15.9724264 L62.419983,15.5884539 C63.0028458,15.9068103 63.5829601,16.2295679 64.1602813,16.5566821 L63.1177986,15.9724264 C63.7015392,16.2960039 64.2824841,16.6240115 64.8605878,16.9564037 L64.1602813,16.5566821 C64.699124,16.861994 65.2355335,17.1711011 65.7694735,17.483967 L64.8605878,16.9564037 C65.441059,17.2901571 66.0186658,17.6283311 66.5933621,17.9708798 L65.7694735,17.483967 C66.3503899,17.8243591 66.9283832,18.1692006 67.5034065,18.5184446 L66.5933621,17.9708798 C67.1459405,18.3002451 67.6958282,18.6336547 68.2429844,18.971068 L67.5034065,18.5184446 C68.0588979,18.8558258 68.6116177,19.1973155 69.1615236,19.5428716 L68.2429844,18.971068 C68.8025407,19.3161279 69.3592402,19.665375 69.9130393,20.0187654 L69.1615236,19.5428716 C69.7268886,19.8981421 70.2892794,20.2577107 70.8486501,20.6215317 L69.9130393,20.0187654 C70.4588215,20.3670401 71.0017867,20.7193392 71.541893,21.0756207 L70.8486501,20.6215317 C71.3933693,20.9758232 71.9352246,21.3341473 72.4741736,21.6964616 L71.541893,21.0756207 C72.0978739,21.4423739 72.6508254,21.8133472 73.2007018,22.1884948 L72.4741736,21.6964616 C72.9905649,22.0436112 73.5042881,22.3944239 74.015306,22.7488626 L73.2007018,22.1884948 C73.7518719,22.5645251 74.2999526,22.9447495 74.8448978,23.329122 L74.015306,22.7488626 C74.5567591,23.1244111 75.0951752,23.5040302 75.6305099,23.8876758 L74.8448978,23.329122 C75.3769567,23.7044053 75.9060267,24.0836429 76.432065,24.466792 L75.6305099,23.8876758 C76.1470459,24.2578495 76.6607132,24.6317718 77.1714719,25.0094029 L76.432065,24.466792 C76.9784182,24.8647379 77.5215011,25.2669031 78.0612657,25.67324 L77.1714719,25.0094029 C77.6878209,25.3911672 78.2011972,25.776722 78.7115599,26.1660262 L78.0612657,25.67324 C78.5735207,26.0588676 79.0827871,26.4482524 79.589024,26.8413534 L78.7115599,26.1660262 C79.2390762,26.5684152 79.7633728,26.9748098 80.2844044,27.3851647 L79.589024,26.8413534 C80.1069426,27.2435255 80.6216901,27.6495874 81.1332228,28.0594951 L80.2844044,27.3851647 C80.8007533,27.7918316 81.3138956,28.202388 81.8237871,28.6167895 L81.1332228,28.0594951 C81.6360711,28.4624438 82.1358127,28.8691088 82.6324061,29.2794486 L81.8237871,28.6167895 C82.335396,29.0325869 82.8437321,29.4522554 83.3487509,29.8757505 L82.6324061,29.2794486 C83.128901,29.6897071 83.6222489,30.103639 84.1124082,30.5212025 L83.3487509,29.8757505 C83.8550371,30.3003085 84.3579893,30.7287122 84.8575625,31.1609168 L84.1124082,30.5212025 C84.6154248,30.9497191 85.1150834,31.3820605 85.6113388,31.8181816 L84.8575625,31.1609168 C85.3485862,31.5857248 85.8363456,32.0142047 86.320798,32.4463137 L85.6113388,31.8181816 C86.0891863,32.2381255 86.5638786,32.6615739 87.0353754,33.0884866 L86.320798,32.4463137 C86.8178492,32.8896604 87.3114192,33.3368275 87.8014618,33.7877688 L87.0353754,33.0884866 C87.5161092,33.523763 87.993521,33.9626408 88.4675684,34.4050775 L87.8014618,33.7877688 C88.2822357,34.230181 88.7596144,34.676226 89.2335543,35.1258604 L88.4675684,34.4050775 C88.9494183,34.8547963 89.427792,35.3081922 89.9026448,35.7652203 L89.2335543,35.1258604 C89.6992175,35.5676424 90.1615609,36.0128894 90.6205434,36.4615602 L89.9026448,35.7652203 C90.3706703,36.2156774 90.8352755,36.6696631 91.2964176,37.1271346 L90.6205434,36.4615602 C91.0864591,36.9170085 91.5489115,37.3759847 92.0078574,37.8384457 L91.2964176,37.1271346 C91.7608217,37.5878421 92.2217135,38.052085 92.6790492,38.5198194 L92.0078574,37.8384457 C92.4691939,38.3033157 92.9269874,38.7717068 93.3811938,39.2435751 L92.6790492,38.5198194 C93.1459528,38.9973392 93.60915,39.4784982 94.0685943,39.9632498 L93.3811938,39.2435751 C93.8163415,39.6956436 94.2481969,40.1509037 94.6767214,40.6093168 L94.0685943,39.9632498 C94.5270492,40.4469575 94.9817674,40.9342425 95.4327026,41.4250584 L94.6767214,40.6093168 C95.1170878,41.0803977 95.5539366,41.5548082 95.9872261,42.0325065 L95.4327026,41.4250584 C95.8682456,41.8991209 96.3002595,42.3764774 96.7287026,42.8570863 L95.9872261,42.0325065 C96.4477372,42.5402165 96.9042277,43.0516403 97.3566472,43.5667278 L96.7287026,42.8570863 C97.1350896,43.3129537 97.538264,43.7717472 97.9381903,44.2334312 L97.3566472,43.5667278 C97.790326,44.0604786 98.2202641,44.5575957 98.6464172,45.058035 L97.9381903,44.2334312 C98.38272,44.7466066 98.8232366,45.2633533 99.2596914,45.7836225 L98.6464172,45.058035 C99.057316,45.5405607 99.464696,46.026175 99.8685174,46.5148381 L99.2596914,45.7836225 C99.6737,46.2771352 100.084054,46.7738174 100.490711,47.2736274 L99.8685174,46.5148381 C100.296805,47.0331078 100.72109,47.5548069 101.141325,48.0798881 L100.490711,47.2736274 C100.895041,47.7705769 101.295717,48.2706186 101.692697,48.7737114 L101.141325,48.0798881 C101.543123,48.5819328 101.941219,49.0870694 102.33557,49.5952565 L101.692697,48.7737114 C102.109573,49.3020185 102.522374,49.8336902 102.931053,50.3686792 L102.33557,49.5952565 C102.731494,50.1054695 103.123645,50.6187575 103.511979,51.1350784 L102.931053,50.3686792 C103.334048,50.8962274 103.733035,51.4270011 104.127967,51.9609551 L103.511979,51.1350784 C103.896952,51.6469299 104.278175,52.1617621 104.655607,52.6795342 L104.127967,51.9609551 C104.520836,52.492119 104.909693,53.0264301 105.294493,53.5638434 L104.655607,52.6795342 C105.039958,53.2067972 105.420377,53.7371089 105.796823,54.2704261 L105.294493,53.5638434 C105.691875,54.1188275 106.084931,54.6771201 106.473611,55.2386719 L105.796823,54.2704261 C106.166443,54.7940735 106.532232,55.3206185 106.894149,55.8500203 L106.473611,55.2386719 C106.821097,55.7407067 107.165085,56.2453464 107.505541,56.7525558 L106.894149,55.8500203 C107.286315,56.4236702 107.673935,57.0006745 108.056957,57.5809812 L107.505541,56.7525558 C107.862522,57.2843841 108.21562,57.8190376 108.564793,58.3564757 L108.056957,57.5809812 C108.407207,58.1116355 108.753611,58.6450512 109.096131,59.1811886 L108.564793,58.3564757 C108.92657,58.9133114 109.284133,59.4731362 109.637439,60.0359051 L109.096131,59.1811886 C109.457241,59.7464255 109.814034,60.3146875 110.166462,60.8859284 L109.637439,60.0359051 C109.971236,60.5675991 110.301233,61.101921 110.627391,61.6388328 L110.166462,60.8859284 C110.511986,61.4459784 110.853315,62.0088916 111.190405,62.5746241 L110.627391,61.6388328 C110.973264,62.208197 111.314819,62.7804736 111.652013,63.3556171 L111.190405,62.5746241 C111.518716,63.1256222 111.843005,63.6792946 112.163234,64.235601 L111.652013,63.3556171 C111.996349,63.9429433 112.336137,64.5332591 112.671327,65.1265162 L112.163234,64.235601 C112.493321,64.8090339 112.819092,65.3852654 113.140504,65.9642512 L112.671327,65.1265162 C112.97713,65.6677607 113.279107,66.2114533 113.57722,66.7575573 L113.140504,65.9642512 C113.463725,66.5464962 113.782537,67.1315265 114.096896,67.719297 L113.57722,66.7575573 C113.887196,67.3253917 114.192996,67.8958332 114.494577,68.4688406 L114.096896,67.719297 C114.4105,68.3056574 114.719671,68.8947449 115.024365,69.4865147 L114.494577,68.4688406 C114.81617,69.0798688 115.132966,69.6938147 115.444916,70.3106283 L115.024365,69.4865147 C115.306805,70.0350631 115.585398,70.5859163 115.860107,71.1390387 L115.444916,70.3106283 C115.758739,70.9311445 116.067656,71.5545628 116.371619,72.1808323 L115.860107,71.1390387 C116.163805,71.7505273 116.462757,72.3647893 116.756915,72.9817764 L116.371619,72.1808323 C116.642287,72.7385044 116.909026,73.2984373 117.171799,73.8605951 L116.756915,72.9817764 C117.036763,73.5687486 117.312272,74.1581872 117.583401,74.7500508 L117.171799,73.8605951 C117.456989,74.4707104 117.737509,75.0834463 118.013312,75.6987568 L117.583401,74.7500508 C117.862957,75.3603108 118.137857,75.9731489 118.408055,76.5885196 L118.013312,75.6987568 C118.275824,76.2844156 118.534062,76.8724067 118.787988,77.4626906 L118.408055,76.5885196 C118.671235,77.1879098 118.929955,77.7897027 119.184171,78.3938564 L118.787988,77.4626906 C119.066282,78.1096237 119.339397,78.7593108 119.607278,79.4116996 L119.184171,78.3938564 C119.436659,78.9939015 119.684704,79.5962752 119.928266,80.2009366 L119.607278,79.4116996 C119.852512,80.0089325 120.09336,80.6084295 120.329783,81.2101507 L119.928266,80.2009366 C120.180264,80.8265405 120.427463,81.4545931 120.669817,82.085049 L120.329783,81.2101507 C120.560362,81.7969972 120.786731,82.3859592 121.008854,82.9769995 L120.669817,82.085049 C120.913803,82.7197504 121.152878,83.3568875 121.386997,83.9964136 L121.008854,82.9769995 C121.232539,83.5721968 121.451918,84.1695019 121.666952,84.7688766 L121.386997,83.9964136 C121.611251,84.6089931 121.830957,85.2237646 122.046074,85.8406873 L121.666952,84.7688766 C121.910336,85.4472721 122.148155,86.1283189 122.380353,86.8119622 L122.046074,85.8406873 C122.263349,86.4637965 122.475942,87.0891003 122.683812,87.7165564 L122.380353,86.8119622 C122.583588,87.4103295 122.782517,88.0106858 122.977103,88.6129942 L122.683812,87.7165564 C122.898612,88.364931 123.108368,89.0156038 123.313034,89.6685285 L122.977103,88.6129942 C123.171365,89.2142989 123.361298,89.8175492 123.546867,90.4227084 L123.313034,89.6685285 C123.512473,90.3047766 123.707078,90.9431629 123.896807,91.5836444 L123.546867,90.4227084 C123.754064,91.098399 123.955819,91.7764695 124.152082,92.4568687 L123.896807,91.5836444 C124.083039,92.2123229 124.264573,92.84302 124.441368,93.4756952 L124.152082,92.4568687 C124.34224,93.1161036 124.527241,93.7775247 124.707039,94.4410853 L124.441368,93.4756952 C124.622922,94.1253983 124.799477,94.7771874 124.970991,95.4310184 L124.707039,94.4410853 C124.88959,95.1148036 125.066778,95.7907276 125.238553,96.4688085 L124.970991,95.4310184 C125.139309,96.0726633 125.302771,96.7162748 125.461336,97.3618111 L125.238553,96.4688085 C125.404069,97.1221792 125.56456,97.7775525 125.719983,98.4348849 L125.461336,97.3618111 C125.62309,98.0203315 125.779748,98.6808549 125.931266,99.3433372 L125.719983,98.4348849 C125.880056,99.1118866 126.034754,99.7909663 126.184027,100.472077 L125.931266,99.3433372 C126.080072,99.9939613 126.22392,100.646475 126.362768,101.300836 L126.184027,100.472077 C126.324993,101.115283 126.461123,101.760299 126.592376,102.407087 L126.362768,101.300836 C126.505492,101.973464 126.642934,102.648045 126.775047,103.324532 L126.592376,102.407087 C126.71821,103.027174 126.839562,103.648888 126.956396,104.272195 L126.775047,103.324532 C126.905015,103.990037 127.029827,104.657387 127.149439,105.326539 L126.956396,104.272195 C127.072257,104.890312 127.183675,105.509995 127.290616,106.13121 L127.149439,105.326539 C127.271008,106.00664 127.387205,106.688601 127.497985,107.372379 L127.290616,106.13121 C127.40867,106.816978 127.521268,107.504612 127.628362,108.194066 L127.497985,107.372379 C127.603878,108.025989 127.704821,108.681257 127.800774,109.338145 L127.628362,108.194066 C127.758807,109.033841 127.881089,109.876317 127.995123,110.721409 L127.800774,109.338145 C127.898791,110.009151 127.991601,110.681847 128.079162,111.35619 L127.995123,110.721409 C128.082233,111.366972 128.164531,112.014061 128.241979,112.662639 L128.079162,111.35619 C128.168368,112.043192 128.252126,112.731903 128.330392,113.42228 L128.330445,113.42275 C128.452179,114.496553 128.560669,115.574858 128.655692,116.657027 C128.742137,117.641531 128.817421,118.628982 128.881438,119.619501 C129.060496,122.390166 129.151401,125.184467 129.151401,128 L129.150401,127.882 L129.151,127.999 C129.151401,128.344108 129.150043,128.687899 129.147333,129.031367 L129.132669,130.212212 C129.121396,130.877465 129.105047,131.541482 129.08366,132.204225 C129.038848,133.592889 128.971913,134.976007 128.883199,136.353195 L128.883182,136.35347 C128.617031,140.485158 128.154807,144.563741 127.505734,148.579736 C127.389504,149.298892 127.267238,150.016286 127.139029,150.731619 L127.306628,149.77557 C127.204072,150.373969 127.097361,150.970949 126.986527,151.56648 L127.139029,150.731619 C127.019611,151.397904 126.895037,152.0624 126.765351,152.725066 L126.986527,151.56648 C126.845481,152.324348 126.697757,153.079868 126.543419,153.832977 L126.765351,152.725066 C126.636841,153.381717 126.50331,154.036571 126.3648,154.689585 L126.543419,153.832977 C126.414709,154.461031 126.281399,155.087409 126.143525,155.712073 L126.3648,154.689585 C126.22224,155.361694 126.074406,156.031854 125.921342,156.70002 L126.143525,155.712073 C126.010535,156.314613 125.873299,156.915558 125.731851,157.514877 L125.921342,156.70002 C125.769622,157.362318 125.612765,158.022656 125.450814,158.680991 L125.731851,157.514877 C125.569963,158.200797 125.402556,158.884585 125.229681,159.566193 L125.450814,158.680991 C125.293227,159.321587 125.130818,159.960286 124.963626,160.597047 L125.229681,159.566193 C125.06951,160.197712 124.904644,160.82736 124.735123,161.455096 L124.963626,160.597047 C124.786741,161.270726 124.604503,161.942237 124.41696,162.611531 L124.735123,161.455096 C124.577051,162.040437 124.414931,162.624115 124.248796,163.2061 L124.41696,162.611531 C124.240534,163.241154 124.059413,163.868816 123.873638,164.494476 L124.248796,163.2061 C124.03232,163.964428 123.809027,164.71988 123.578986,165.472386 L123.873638,164.494476 C123.68582,165.127015 123.493246,165.757508 123.295955,166.385914 L123.578986,165.472386 C123.397139,166.067242 123.211075,166.660258 123.020829,167.251397 L123.295955,166.385914 C123.087796,167.048937 122.874388,167.709637 122.655779,168.367963 L123.020829,167.251397 C122.836955,167.82274 122.649174,168.39233 122.457519,168.960136 L122.655779,168.367963 C122.449429,168.989371 122.238445,169.608665 122.022869,170.225803 L122.457519,168.960136 C122.203379,169.713063 121.942425,170.462852 121.674732,171.209432 L122.022869,170.225803 C121.811931,170.829662 121.596596,171.431457 121.376903,172.031151 L121.674732,171.209432 C121.437552,171.870913 121.19508,172.529874 120.947369,173.186264 L121.376903,172.031151 C121.1472,172.658164 120.912733,173.282879 120.673544,173.905253 L120.947369,173.186264 C120.734843,173.749418 120.518461,174.31068 120.298253,174.870016 L120.673544,173.905253 C120.426269,174.548668 120.173948,175.18958 119.91663,175.827942 L120.298253,174.870016 C120.064712,175.463222 119.826869,176.054262 119.584762,176.6431 L119.91663,175.827942 C119.67518,176.426936 119.42933,177.023684 119.17912,177.618146 L119.584762,176.6431 C119.314423,177.3006 119.038769,177.955353 118.757852,178.607305 L119.17912,177.618146 C118.923741,178.224889 118.66382,178.829249 118.3994,179.431186 L118.757852,178.607305 C118.499308,179.207336 118.236305,179.804995 117.968887,180.400241 L118.3994,179.431186 C118.131394,180.041287 117.858765,180.648897 117.581558,181.253973 L117.968887,180.400241 C117.710642,180.975067 117.448279,181.547642 117.181836,182.117928 L117.581558,181.253973 C117.301232,181.865857 117.016224,182.47515 116.72658,183.081804 L117.181836,182.117928 C116.915853,182.687227 116.645805,183.254245 116.371727,183.818945 L116.72658,183.081804 C116.440017,183.682007 116.148916,184.279627 115.853322,184.874622 L116.371727,183.818945 C116.07481,184.430701 115.773164,185.039737 115.466838,185.646005 L115.853322,184.874622 C115.568689,185.447552 115.27989,186.018048 114.986964,186.586068 L115.466838,185.646005 C115.161729,186.249864 114.851976,186.850977 114.537625,187.449296 L114.986964,186.586068 C114.681635,187.17814 114.371822,187.767523 114.057571,188.354172 L114.537625,187.449296 C114.244388,188.00743 113.947151,188.563133 113.645951,189.116368 L114.057571,188.354172 C113.740142,188.946755 113.418183,189.536548 113.091743,190.123506 L113.645951,189.116368 C113.33328,189.690675 113.016338,190.262322 112.695169,190.831266 L113.091743,190.123506 C112.782215,190.680052 112.468657,191.234049 112.151109,191.785457 L112.695169,190.831266 C112.352495,191.438307 112.005008,192.042272 111.652761,192.643108 L112.151109,191.785457 C111.826883,192.348462 111.498496,192.908767 111.165992,193.466331 L111.652761,192.643108 C111.313106,193.222465 110.969025,193.798913 110.620564,194.372406 L111.165992,193.466331 C110.832913,194.024858 110.495701,194.580635 110.1544,195.13362 L110.620564,194.372406 C110.286466,194.92226 109.948342,195.469398 109.606232,196.013778 L110.1544,195.13362 C109.80397,195.701393 109.449228,196.266223 109.09022,196.828063 L109.606232,196.013778 C109.266899,196.553741 108.923645,197.090991 108.57651,197.625487 L109.09022,196.828063 C108.737445,197.380148 108.380551,197.929346 108.019581,198.475614 L108.57651,197.625487 C108.227648,198.162643 107.874867,198.697018 107.518207,199.228572 L108.019581,198.475614 C107.647385,199.038871 107.270855,199.599013 106.890039,200.155992 L107.518207,199.228572 C107.145737,199.783688 106.769036,200.335727 106.388151,200.884643 L106.890039,200.155992 C106.543179,200.663306 106.192763,201.167998 105.838828,201.670029 L106.388151,200.884643 C106.008621,201.431607 105.624936,201.975471 105.237143,202.516188 L105.838828,201.670029 C105.447382,202.225266 105.051631,202.77725 104.651623,203.325931 L105.237143,202.516188 C104.863531,203.03713 104.486106,203.555151 104.104908,204.070211 L104.651623,203.325931 C104.272376,203.846134 103.889304,204.363369 103.502446,204.877595 L104.104908,204.070211 C103.712247,204.600759 103.315583,205.128164 102.914961,205.652383 L103.502446,204.877595 C103.114657,205.393058 102.723065,205.905497 102.327712,206.41487 L102.914961,205.652383 C102.491889,206.205976 102.064402,206.756016 101.632553,207.302449 L102.327712,206.41487 C101.944303,206.908853 101.557357,207.399953 101.166911,207.888132 L101.632553,207.302449 C101.232763,207.808317 100.829234,208.311095 100.422009,208.81074 L101.166911,207.888132 C100.743715,208.417259 100.316407,208.942954 99.8850362,209.465168 L100.422009,208.81074 C100.032329,209.288857 99.6392632,209.764106 99.2428491,210.23645 L99.8850362,209.465168 C99.4671376,209.971074 99.0454257,210.473713 98.6199444,210.973043 L99.2428491,210.23645 C98.8122503,210.749526 98.3777003,211.259175 97.9392461,211.76535 L98.6199444,210.973043 C98.1943931,211.472454 97.7650713,211.968554 97.332023,212.461299 L97.9392461,211.76535 C97.5381964,212.228343 97.1338801,212.688429 96.726333,213.145572 L97.332023,212.461299 C96.877312,212.978693 96.4184924,213.492387 95.9556151,214.002332 L96.726333,213.145572 C96.3117151,213.610646 95.8937533,214.072675 95.4724855,214.53162 L95.9556151,214.002332 C95.51589,214.486769 95.072503,214.967823 94.6254978,215.445448 L95.4724855,214.53162 C95.0094532,215.036066 94.5424269,215.536786 94.0714566,216.03373 L94.6254978,215.445448 C94.2134656,215.885704 93.7983592,216.323047 93.3802128,216.757444 L94.0714566,216.03373 C93.6000445,216.531141 93.124681,217.024769 92.6454164,217.514565 L93.3802128,216.757444 C92.9258933,217.229419 92.4679852,217.697916 92.0065323,218.162889 L92.6454164,217.514565 C92.1993995,217.970383 91.750004,218.422881 91.2972704,218.872019 L92.0065323,218.162889 C91.5314946,218.641551 91.0527004,219.11648 90.5701976,219.587628 L91.2972704,218.872019 C90.8518702,219.313883 90.4032391,219.752494 89.9514157,220.187815 L90.5701976,219.587628 C90.1029781,220.043851 89.6322812,220.49653 89.1581504,220.945619 L89.9514157,220.187815 C89.4739011,220.647889 88.9928209,221.104287 88.5082206,221.556965 L89.1581504,220.945619 C88.6909072,221.388184 88.220329,221.827264 87.7464577,222.262817 L88.5082206,221.556965 C88.0264045,222.007042 87.5411087,222.45344 87.0523778,222.896116 L87.7464577,222.262817 C87.2658491,222.704562 86.781853,223.142679 86.2945127,223.577125 L87.0523778,222.896116 C86.5704558,223.332624 86.0851938,223.765513 85.5966347,224.194739 L86.2945127,223.577125 C85.8225155,223.997893 85.3473815,224.415217 84.86915,224.829057 L85.5966347,224.194739 C85.0897786,224.640039 84.5793739,225.081398 84.0654685,225.518766 L84.86915,224.829057 C84.3762506,225.25559 83.8800609,225.678423 83.380624,226.097513 L84.0654685,225.518766 C83.5803158,225.931663 83.0920432,226.341005 82.6006908,226.746749 L83.380624,226.097513 C82.8722317,226.524117 82.3604747,226.946842 81.8453986,227.365642 L82.6006908,226.746749 C82.0975033,227.162267 81.5910859,227.574014 81.0814821,227.981944 L81.8453986,227.365642 C81.335027,227.780618 80.8213967,228.19174 80.3045519,228.598964 L81.0814821,227.981944 C80.5902608,228.37516 80.0960787,228.764832 79.5989747,229.150919 L80.3045519,228.598964 C79.7636592,229.025136 79.2192461,229.44704 78.6713632,229.864623 L79.5989747,229.150919 C79.0864739,229.548965 78.5708672,229.943201 78.0521973,230.333586 L78.6713632,229.864623 C78.1827553,230.237029 77.6913878,230.605999 77.1972968,230.971498 L78.0521973,230.333586 C77.4963672,230.75194 76.9370192,231.165871 76.3742055,231.575326 L77.1972968,230.971498 C76.7000707,231.339316 76.2000863,231.703619 75.6973806,232.064369 L76.3742055,231.575326 C75.8495032,231.957055 75.3217888,232.334894 74.7911045,232.7088 L75.6973806,232.064369 C75.1471929,232.459193 74.5937453,232.849762 74.0370861,233.236027 L74.7911045,232.7088 C74.2675106,233.077711 73.7410256,233.442793 73.2116904,233.804007 L74.0370861,233.236027 C73.4973717,233.610535 72.9546382,233.980997 72.4089295,234.34737 L73.2116904,233.804007 C72.6673339,234.175472 72.1199631,234.542845 71.5696221,234.906083 L72.4089295,234.34737 C71.8671903,234.711079 71.3225191,235.070757 70.7749586,235.426362 L71.5696221,234.906083 C71.0293096,235.262701 70.4861343,235.615333 69.940138,235.963938 L70.7749586,235.426362 C70.2120658,235.791925 69.6461198,236.153184 69.0771672,236.510091 L69.940138,235.963938 C69.3931007,236.313206 68.8432318,236.658432 68.2905733,236.999571 L69.0771672,236.510091 C68.5396385,236.847287 67.9994261,237.180599 67.4565694,237.509988 L68.2905733,236.999571 C67.7104032,237.357693 67.1271588,237.711312 66.540889,238.06038 L67.4565694,237.509988 C66.9147579,237.838744 66.3703122,238.163591 65.8232714,238.484492 L66.540889,238.06038 C65.9898343,238.388481 65.4361066,238.71256 64.8797465,239.032578 L65.8232714,238.484492 C65.2443965,238.824067 64.6626157,239.159223 64.0779752,239.489913 L64.8797465,239.032578 C64.3030742,239.36428 63.7235737,239.691619 63.14129,240.014549 L64.0779752,239.489913 C63.5166194,239.807432 62.9526272,240.120835 62.3860397,240.430079 L63.14129,240.014549 C62.5735849,240.329394 62.0032343,240.640048 61.4302799,240.94647 L62.3860397,240.430079 C61.7731753,240.764581 61.1572742,241.094218 60.5383884,241.418939 L61.4302799,240.94647 C60.8721887,241.244943 60.311627,241.539401 59.7486336,241.829805 L60.5383884,241.418939 C59.9441747,241.730714 59.3472095,242.037956 58.7475387,242.34062 L59.7486336,241.829805 C59.1546291,242.136204 58.5579174,242.438091 57.9585441,242.735419 L58.7475387,242.34062 C58.1659576,242.634153 57.5818316,242.92338 56.9952028,243.208258 L57.9585441,242.735419 C57.3720834,243.026342 56.7830744,243.312901 56.1915595,243.595053 L56.9952028,243.208258 C56.4175638,243.488771 55.837498,243.765067 55.2550455,244.037107 L56.1915595,243.595053 C55.5758749,243.888735 54.9574755,244.177642 54.3364092,244.461727 L55.2550455,244.037107 C54.7028655,244.295008 54.1485404,244.549083 53.5921044,244.799299 L54.3364092,244.461727 C53.7338191,244.737361 53.1287183,245.008456 52.5211507,245.274968 L53.5921044,244.799299 C52.9651089,245.081244 52.3354331,245.358289 51.7031257,245.630384 L52.5211507,245.274968 C51.9312738,245.533719 51.3390715,245.788151 50.744584,246.038223 L51.7031257,245.630384 C51.0691696,245.903189 50.4325682,246.171019 49.7933706,246.433825 L50.744584,246.038223 C50.134643,246.294795 49.5222964,246.546778 48.9075875,246.794127 L49.7933706,246.433825 C49.1784272,246.686659 48.561081,246.934843 47.9413757,247.178333 L48.9075875,246.794127 C48.2967891,247.039903 47.6836584,247.281105 47.0682376,247.517691 L47.9413757,247.178333 C47.3166612,247.423791 46.6895494,247.664479 46.0600851,247.900352 L47.0682376,247.517691 C46.4497403,247.755459 45.8289301,247.988564 45.2058499,248.216964 L46.0600851,247.900352 C45.4304002,248.136308 44.7983612,248.367445 44.1640129,248.59372 L45.2058499,248.216964 C44.5807288,248.446111 43.9533228,248.670522 43.3236755,248.890153 L44.1640129,248.59372 C43.5505704,248.812537 42.9349683,249.026806 42.3172473,249.236487 L43.3236755,248.890153 C42.6949559,249.10946 42.0640016,249.324001 41.4308559,249.533732 L42.3172473,249.236487 C41.6558529,249.460993 40.9920293,249.680238 40.3258264,249.894173 L41.4308559,249.533732 C40.8059226,249.740743 40.1788545,249.943069 39.549693,250.140667 L40.3258264,249.894173 C39.7098997,250.091963 39.0919393,250.285214 38.4719844,250.473888 L39.549693,250.140667 C38.8966066,250.34578 38.2412647,250.545799 37.5837138,250.740678 L38.4719844,250.473888 C37.8689229,250.657419 37.2639742,250.836619 36.6571745,251.011451 L37.5837138,250.740678 C36.9481254,250.929048 36.3104732,251.112615 35.6707991,251.291338 L36.6571745,251.011451 C35.9343839,251.219701 35.2089671,251.421754 34.4809854,251.617548 L35.6707991,251.291338 C35.0392187,251.4678 34.4056674,251.639539 33.7701855,251.806515 L34.4809854,251.617548 C33.8281091,251.793141 33.1731699,251.9637 32.5162119,252.129181 L33.7701855,251.806515 C33.1130541,251.97918 32.4538584,252.146751 31.7926431,252.309185 L32.5162119,252.129181 C31.8449172,252.298273 31.1715147,252.462062 30.4960514,252.620502 L31.7926431,252.309185 C31.1469731,252.467799 30.4993774,252.621515 29.8498975,252.77029 L30.4960514,252.620502 C29.9181791,252.75605 29.3387984,252.887683 28.757939,253.015371 L29.8498975,252.77029 C29.162622,252.927722 28.4732368,253.079622 27.7817912,253.22594 L28.757939,253.015371 C28.1919591,253.139787 27.6245751,253.260458 27.0558145,253.377357 L27.7817912,253.22594 C27.122036,253.365552 26.460405,253.500082 25.7969411,253.629487 L27.0558145,253.377357 C26.3641822,253.519509 25.6705141,253.656082 24.9748593,253.787027 L25.7969411,253.629487 C25.1413574,253.757355 24.483984,253.880219 23.8248623,253.998038 L24.9748593,253.787027 C24.2706171,253.919589 23.5643389,254.046382 22.8560756,254.167357 L23.8248623,253.998038 C23.1506957,254.118546 22.4747,254.233776 21.7969197,254.343683 L22.8560756,254.167357 C22.2296489,254.274354 21.6016693,254.376798 20.9721722,254.474656 L21.7969197,254.343683 C21.1254636,254.452565 20.4522559,254.556223 19.7773397,254.654615 L20.9721722,254.474656 C20.327024,254.574946 19.6802817,254.670419 19.0319835,254.761035 L19.7773397,254.654615 C19.0931126,254.754363 18.4071296,254.848699 17.7194355,254.937577 L19.0319835,254.761035 C18.3297407,254.859191 17.6256722,254.95165 16.9198261,255.038363 L17.7194355,254.937577 C17.0602172,255.022775 16.3994266,255.102958 15.7371031,255.178086 L16.9198261,255.038363 C16.0186616,255.14907 15.1145998,255.250411 14.2077409,255.342286 L15.7371031,255.178086 C15.0580163,255.255115 14.3773181,255.32683 13.695051,255.393189 L14.2077409,255.342286 C13.6030075,255.403553 12.9970303,255.460609 12.3898391,255.513427 L13.695051,255.393189 C12.998156,255.460971 12.2996242,255.523165 11.5995009,255.579724 L11.5997433,255.579704 C10.2212062,255.691069 8.83674373,255.780579 7.44645981,255.847909 L7.44617799,255.847922 L5.37653479,255.931582 L5.37653479,255.931582 L3.26811521,255.982852 L1.26940117,255.999 L1.386,255.998 L1.15140117,256 C0.767203079,256 0.38340034,255.998307 -7.41230965e-11,255.994929 L1.15140117,256 Z" fill="#FFFFFF" transform="translate(64.575701, 128.000000) rotate(-180.000000) translate(-64.575701, -128.000000) "></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default HalfCircle;