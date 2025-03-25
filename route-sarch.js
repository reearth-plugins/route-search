reearth.ui.show(`
    <style>
    body,
    h2,
    h3 {
        margin: 0;
        font-family: Arial, sans-serif;
    }
    
    .container {
        display: flex;
        width: 290px;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 4px;
        border: 1px solid #8b8b8b;
        background: var(--Neutral-Color-Palette-1, #fff);
    }
    
    .label-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
    }
    
    /* header */
    
    .header {
        display: flex;
        padding: 12px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
    }
    
    .header-title {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .title-text {
        color: #000;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
    }
    
    .close-button {
        width: 16px;
        height: 16px;
    }
    
    /* form */
    .form-area {
        display: flex;
        padding: 8px 8px 12px 8px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
    }
    
    /* form select-point */
    .select-point-section {
        display: flex;
        padding: 8px 16px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        gap: 8px;
        align-self: stretch;
    }
    
    .point-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1 0 0;
        align-self: stretch;
    }
    
    .input-wrapper {
        display: flex;
        width: 163.649px;
        height: 28px;
        padding: 0 6px;
        align-items: center;
        border-radius: 4px;
        border: 1px solid var(--Light-Outline-weak, #8b8b8b);
    }
    
    .location-input {
        border: none;
        outline: 0;
    }
    
    .location-icon {
        display: flex;
        width: 22px;
        height: 22px;
        padding: 4px;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        position: absolute;
        right: 3px;
        top: 3px;
    }
    
    .input-icon {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
    }
    
    /* form select-move */
    .select-move-section {
        display: flex;
        padding: 12px 16px;
        align-items: flex-start;
        gap: 43px;
        align-self: stretch;
    }
    
    .radio-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        flex: 1 0 0;
    }
    
    input[type="radio"] {
        margin-right: 5px;
    }
    
    /* form search-button-area */
    .search-button-area {
        display: flex;
        padding: 8px 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;
    }
    
    .search-btn {
        width: 100%;
        height: 28px;
        border-radius: 6px;
        border: 1px solid #1a6ed8;
        background: #1a6ed8;
    }
    
    .search-btn span {
        color: #fff;
        text-align: center;
        font-size: 12px;
    }
    
    .search-btn:hover {
        cursor: pointer;
    }
    </style>
    <div class="container">
        <div class="header">
          <div class="header-title">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.625 12.8125C15.0436 12.8133 14.4767 12.9939 14.002 13.3296C13.5273 13.6653 13.168 14.1396 12.9734 14.6875H5.625C5.04484 14.6875 4.48844 14.457 4.0782 14.0468C3.66797 13.6366 3.4375 13.0802 3.4375 12.5C3.4375 11.9198 3.66797 11.3634 4.0782 10.9532C4.48844 10.543 5.04484 10.3125 5.625 10.3125H13.125C14.0367 10.3125 14.911 9.95034 15.5557 9.30568C16.2003 8.66102 16.5625 7.78668 16.5625 6.875C16.5625 5.96332 16.2003 5.08898 15.5557 4.44432C14.911 3.79966 14.0367 3.4375 13.125 3.4375H5.625C5.37636 3.4375 5.1379 3.53627 4.96209 3.71209C4.78627 3.8879 4.6875 4.12636 4.6875 4.375C4.6875 4.62364 4.78627 4.8621 4.96209 5.03791C5.1379 5.21373 5.37636 5.3125 5.625 5.3125H13.125C13.5394 5.3125 13.9368 5.47712 14.2299 5.77015C14.5229 6.06317 14.6875 6.4606 14.6875 6.875C14.6875 7.2894 14.5229 7.68683 14.2299 7.97985C13.9368 8.27288 13.5394 8.4375 13.125 8.4375H5.625C4.54756 8.4375 3.51425 8.86551 2.75238 9.62738C1.99051 10.3892 1.5625 11.4226 1.5625 12.5C1.5625 13.5774 1.99051 14.6108 2.75238 15.3726C3.51425 16.1345 4.54756 16.5625 5.625 16.5625H12.9734C13.1453 17.0486 13.4475 17.4782 13.847 17.8041C14.2465 18.1301 14.728 18.34 15.2387 18.4108C15.7494 18.4817 16.2698 18.4107 16.743 18.2058C17.2161 18.0008 17.6238 17.6698 17.9215 17.2488C18.2192 16.8278 18.3954 16.333 18.4309 15.8186C18.4664 15.3042 18.3598 14.7899 18.1228 14.332C17.8857 13.8741 17.5274 13.4902 17.0868 13.2222C16.6463 12.9542 16.1406 12.8125 15.625 12.8125ZM15.625 16.5625C15.4396 16.5625 15.2583 16.5075 15.1042 16.4045C14.95 16.3015 14.8298 16.1551 14.7589 15.9838C14.6879 15.8125 14.6693 15.624 14.7055 15.4421C14.7417 15.2602 14.831 15.0932 14.9621 14.9621C15.0932 14.831 15.2602 14.7417 15.4421 14.7055C15.624 14.6693 15.8125 14.6879 15.9838 14.7589C16.1551 14.8298 16.3015 14.95 16.4045 15.1042C16.5075 15.2583 16.5625 15.4396 16.5625 15.625C16.5625 15.8736 16.4637 16.1121 16.2879 16.2879C16.1121 16.4637 15.8736 16.5625 15.625 16.5625Z"
                fill="#1A6ED8"
              />
            </svg>
            <h2 class="title-text">経路検索</h2>
          </div>
          <div class="close-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 6L8 10L12 6"
                stroke="#334155"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="form-area">
          <div class="select-point-section">
            <div class="point-group">
              <span class="label-text" for="destination">開始点</span>
              <div class="input-wrapper">
                <input class="location-input" type="text" placeholder="場所を入力" />
                <div class="location-icon"></div>
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.47949 12.6875C2.47949 12.3654 2.74066 12.1042 3.06283 12.1042H10.9378C11.26 12.1042 11.5212 12.3654 11.5212 12.6875C11.5212 13.0097 11.26 13.2709 10.9378 13.2709H3.06283C2.74066 13.2709 2.47949 13.0097 2.47949 12.6875Z"
                      fill="#BFBFBF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.00033 4.52085C6.35599 4.52085 5.83366 5.04319 5.83366 5.68752C5.83366 6.33185 6.35599 6.85419 7.00033 6.85419C7.64466 6.85419 8.16699 6.33185 8.16699 5.68752C8.16699 5.04319 7.64466 4.52085 7.00033 4.52085ZM4.66699 5.68752C4.66699 4.39886 5.71166 3.35419 7.00033 3.35419C8.28899 3.35419 9.33366 4.39886 9.33366 5.68752C9.33366 6.97618 8.28899 8.02085 7.00033 8.02085C5.71166 8.02085 4.66699 6.97618 4.66699 5.68752Z"
                      fill="#BFBFBF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.00033 1.89585C5.99471 1.89585 5.03029 2.29533 4.31921 3.00641C3.60814 3.71748 3.20866 4.68191 3.20866 5.68752C3.20866 7.44624 4.19265 9.0619 5.25301 10.2813C5.77607 10.8828 6.30062 11.3682 6.69453 11.703C6.80895 11.8003 6.91199 11.8845 7.00032 11.9549C7.08866 11.8845 7.1917 11.8003 7.30612 11.703C7.70003 11.3682 8.22458 10.8828 8.74764 10.2813C9.808 9.0619 10.792 7.44624 10.792 5.68752C10.792 4.68191 10.3925 3.71748 9.68144 3.00641C8.97036 2.29533 8.00594 1.89585 7.00033 1.89585ZM7.00033 12.6875C6.66581 13.1654 6.66565 13.1653 6.66547 13.1652L6.66388 13.164L6.66036 13.1616L6.64865 13.1532C6.6388 13.1462 6.62491 13.1362 6.60725 13.1233C6.57194 13.0975 6.5215 13.0602 6.45811 13.0117C6.33139 12.9149 6.15255 12.7735 5.93894 12.5919C5.51253 12.2295 4.94333 11.7032 4.37264 11.0469C3.2455 9.75064 2.04199 7.8663 2.04199 5.68752C2.04199 4.37249 2.56439 3.11132 3.49425 2.18145C4.42412 1.25158 5.68529 0.729187 7.00033 0.729187C8.31536 0.729187 9.57653 1.25158 10.5064 2.18145C11.4363 3.11132 11.9587 4.37249 11.9587 5.68752C11.9587 7.8663 10.7552 9.75064 9.62801 11.0469C9.05732 11.7032 8.48812 12.2295 8.06171 12.5919C7.84811 12.7735 7.66926 12.9149 7.54254 13.0117C7.47915 13.0602 7.42871 13.0975 7.3934 13.1233C7.37574 13.1362 7.36185 13.1462 7.352 13.1532L7.3403 13.1616L7.33678 13.164L7.33561 13.1649C7.33544 13.165 7.33485 13.1654 7.00033 12.6875ZM7.00033 12.6875L7.33485 13.1654C7.13399 13.306 6.86633 13.3058 6.66547 13.1652L7.00033 12.6875Z"
                      fill="#BFBFBF"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div class="point-group">
              <span class="label-text" for="destination">到着点</span>
              <div class="input-wrapper">
                <input class="location-input" type="text" placeholder="場所を入力" />
                <div class="location-icon"></div>
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.47949 12.6875C2.47949 12.3654 2.74066 12.1042 3.06283 12.1042H10.9378C11.26 12.1042 11.5212 12.3654 11.5212 12.6875C11.5212 13.0097 11.26 13.2709 10.9378 13.2709H3.06283C2.74066 13.2709 2.47949 13.0097 2.47949 12.6875Z"
                      fill="#BFBFBF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.00033 4.52085C6.35599 4.52085 5.83366 5.04319 5.83366 5.68752C5.83366 6.33185 6.35599 6.85419 7.00033 6.85419C7.64466 6.85419 8.16699 6.33185 8.16699 5.68752C8.16699 5.04319 7.64466 4.52085 7.00033 4.52085ZM4.66699 5.68752C4.66699 4.39886 5.71166 3.35419 7.00033 3.35419C8.28899 3.35419 9.33366 4.39886 9.33366 5.68752C9.33366 6.97618 8.28899 8.02085 7.00033 8.02085C5.71166 8.02085 4.66699 6.97618 4.66699 5.68752Z"
                      fill="#BFBFBF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.00033 1.89585C5.99471 1.89585 5.03029 2.29533 4.31921 3.00641C3.60814 3.71748 3.20866 4.68191 3.20866 5.68752C3.20866 7.44624 4.19265 9.0619 5.25301 10.2813C5.77607 10.8828 6.30062 11.3682 6.69453 11.703C6.80895 11.8003 6.91199 11.8845 7.00032 11.9549C7.08866 11.8845 7.1917 11.8003 7.30612 11.703C7.70003 11.3682 8.22458 10.8828 8.74764 10.2813C9.808 9.0619 10.792 7.44624 10.792 5.68752C10.792 4.68191 10.3925 3.71748 9.68144 3.00641C8.97036 2.29533 8.00594 1.89585 7.00033 1.89585ZM7.00033 12.6875C6.66581 13.1654 6.66565 13.1653 6.66547 13.1652L6.66388 13.164L6.66036 13.1616L6.64865 13.1532C6.6388 13.1462 6.62491 13.1362 6.60725 13.1233C6.57194 13.0975 6.5215 13.0602 6.45811 13.0117C6.33139 12.9149 6.15255 12.7735 5.93894 12.5919C5.51253 12.2295 4.94333 11.7032 4.37264 11.0469C3.2455 9.75064 2.04199 7.8663 2.04199 5.68752C2.04199 4.37249 2.56439 3.11132 3.49425 2.18145C4.42412 1.25158 5.68529 0.729187 7.00033 0.729187C8.31536 0.729187 9.57653 1.25158 10.5064 2.18145C11.4363 3.11132 11.9587 4.37249 11.9587 5.68752C11.9587 7.8663 10.7552 9.75064 9.62801 11.0469C9.05732 11.7032 8.48812 12.2295 8.06171 12.5919C7.84811 12.7735 7.66926 12.9149 7.54254 13.0117C7.47915 13.0602 7.42871 13.0975 7.3934 13.1233C7.37574 13.1362 7.36185 13.1462 7.352 13.1532L7.3403 13.1616L7.33678 13.164L7.33561 13.1649C7.33544 13.165 7.33485 13.1654 7.00033 12.6875ZM7.00033 12.6875L7.33485 13.1654C7.13399 13.306 6.86633 13.3058 6.66547 13.1652L7.00033 12.6875Z"
                      fill="#BFBFBF"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="select-move-section">
            <span class="label-text" for="move">移動方法</span>
            <div class="radio-group">
              <label
                ><input type="radio" name="transport" value="walk" checked /><span class="label-text">徒歩</span></label
              >
              <label><input type="radio" name="transport" value="bike" /><span class="label-text">自転車</span></label>
              <label><input type="radio" name="transport" value="car" /><span class="label-text">自動車</span></label>
            </div>
          </div>
          <div class="search-button-area">
            <button class="search-btn"><span>検索</span></button>
          </div>
        </div>
      </div>
    `);
