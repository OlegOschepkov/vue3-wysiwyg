<script setup lang="ts">
import { onUpdated, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import BasicSvgIcon from '@/components/UI/BasicSvgIcon.vue';
import BasicButton from '@/components/UI/BasicButton.vue';
import WysiwygProps from '@/types/wysiwygProps'
import ActualCaretPosition from '@/types/ActualCaretPosition'
import wysiwygProps from '@/types/wysiwygProps';

const thisState = reactive({
  elements: [
    {
      id: uuidv4(),
      tag: "p",
      content: "Таким образом консультация с широким активом представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки форм развития. Идейные соображения высшего порядка, а также укрепление и развитие структуры влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же реализация намеченных плановых заданий играет важную роль в формировании дальнейших направлений развития. Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании существенных финансовых и административных условий."
    },
    {
      id: uuidv4(),
      tag: "h2",
      content: "Смотрите какие обезьянки"
    },
    {
      id: uuidv4(),
      tag: "img",
      src: "/img/img.png"
    },
    {
      id: uuidv4(),
      tag: "p",
      content: "Таким образом консультация с широким активом представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой инйцу шо шщйоц ущойц ущошцщйуо йцщуо йщцоу щйоу шщйцош ущйтересный эксперимент проверки форм развития. Идейные соображения высшего порядка, а также укрепление и развитие структуры влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же реализация намеченных плановых заданий играет важную роль в формировании дальнейших направлений развития. Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании существенных финансовых и административных условий."
    },
    {
      id: uuidv4(),
      tag: "p",
      content: "Товарищи! новая модель организационной деятельности требуют от нас анализа направлений прогрессивного развития. Задача организации, в особенности же постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же реализация намеченных плановых заданий требуют от нас анализа системы обучения кадров, соответствует насущным потребностям."
    }
  ] as WysiwygProps[]
});

const history: WysiwygProps[][] = [];

let actualHistoryIndex: number = null;

let actualCaretPosition: ActualCaretPosition = {
  id: null,
  position: null
};

const updateContent = (e: Event, id: string) => {
  const target = e.target as HTMLElement;

  if (target.tagName !== 'IMG' && window.getSelection()) {
    const select = window.getSelection();
    const caretPosition: number = select.getRangeAt(0).startOffset;
    actualCaretPosition.id = id;
    actualCaretPosition.position = caretPosition;

    const el: WysiwygProps = thisState.elements.find(x => x.id === id);
    if (el.content !== target.innerHTML) {
      el.content = target.innerHTML;
      saveState();
    }
  }
}

const saveState = () => {
  history.push([...thisState.elements]);
  actualHistoryIndex = history.length - 1;
}

saveState();

const transformNode = (selRange: {startOffset: number, endOffset: number}, node: HTMLElement, select: string, newTag: string) => {
  const tag: string = node.tagName;
  const arrayOfChunks: [string, string] = [node.innerHTML.slice(0, selRange.startOffset), node.innerHTML.slice(selRange.endOffset)];
  const tempMarkupArray: WysiwygProps[] = [];

  arrayOfChunks.forEach(el => {
    const temp: WysiwygProps = {
      id: uuidv4(),
      tag,
      content: el,
    };
    tempMarkupArray.push(temp);
  })

  const newTagElement: WysiwygProps = {
    id: uuidv4(),
    tag: newTag,
    content: select,
  };

  const index: number = thisState.elements.findIndex(x => x.id === node.id);
  tempMarkupArray.splice(tempMarkupArray.length - 1, 0, newTagElement);
  thisState.elements.splice(index, 1, ...tempMarkupArray.filter(el => el.content.length > 0));
  saveState();
}

const changeTag = (newTag: string) => {
  if (window.getSelection()) {
    const select = window.getSelection();
    if (select.toString().length > 0) {
      const selRange = select.getRangeAt(0);
      const parent = select.focusNode.parentNode as HTMLElement;
      transformNode(selRange, parent, select.toString(), newTag);
    }
  }
}

const addImg = () => {
  const result: string = prompt('Введите URL изображения с правильным форматом - png, jpg, jpeg, gif, svg', );
  const urlPattern = new RegExp('(http)?s?:?(\\/\\/[^"\']*\\.(?:png|jpg|jpeg|gif|svg))');
  if (urlPattern.test(result)) {
    const newTagElement: wysiwygProps = {
      id: uuidv4(),
      tag: 'img',
      src: result,
    };
    thisState.elements.push(newTagElement);
    saveState();
  } else {
    alert('Ошибка: укажите правильный адрес или проверьте расширение файла');
  }
}

const copyHTML = () => {
  const copyText: HTMLElement = document.querySelector("[data-content]");
  navigator.clipboard.writeText(copyText.innerHTML as string).then(
      () => {
        alert('Скопировано!');
      },
      () => {
        alert('Пожалуйста используйте другой браузер');
      },
  );
}

const historyGoTo = (type: string) => {
  if (actualHistoryIndex >= 0 && actualHistoryIndex < history.length) {
    if (type === 'backward' && actualHistoryIndex > 0) {
      actualHistoryIndex -= 1;
    } else if (type === 'forward' ) {
      actualHistoryIndex += 1;
    }
    thisState.elements.splice(0, thisState.elements.length, ...history[actualHistoryIndex]);
  }
}

const getImage = (imagePath: string) : string => {
  if (imagePath) {
    return (`${imagePath}`)
  }
}

onUpdated(() => {
  if (actualCaretPosition.id && actualCaretPosition.position) {
    const el: HTMLElement = document.getElementById(`${actualCaretPosition.id}`);
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.firstChild, actualCaretPosition.position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
})
</script>

<template>
  <div class="content">
    <div class="action-bar">
      <BasicButton
        type="button"
        title="Назад"
        :class="{ 'disabled': actualHistoryIndex === 0 }"
        @click="historyGoTo('backward')">
        <BasicSvgIcon
          name="backward-icon"
          width="22"
          height="20"
        />
      </BasicButton>
      <BasicButton
        type="button"
        title="Вперед"
        :class="{ 'disabled': actualHistoryIndex === history.length - 1 }"
         @click="historyGoTo('forward')">
        <BasicSvgIcon
          name="forward-icon"
          width="22"
          height="20"
        />
      </BasicButton>
      <BasicButton
        type="button"
        title="Параграф"
        @click="changeTag('H2')">
        <BasicSvgIcon
          name="paragraph-icon"
          width="28"
          height="28"
        />
      </BasicButton>
      <BasicButton
        type="button"
        title="Заголовок"
        @click="changeTag('P')">
        <BasicSvgIcon
          name="title-icon"
          width="20"
          height="23"
        />
      </BasicButton>
      <BasicButton
        type="button"
        title="Добавить изображение"
         @click="addImg">
        <BasicSvgIcon
          name="img-icon"
          width="22"
          height="20"
        />
      </BasicButton>
      <BasicButton
        type="button"
        title="Скопировать HTML"
        class="btn--transparent"
        @click="copyHTML">
        Скопировать HTML
      </BasicButton>
    </div>
    <div data-content>
      <div data-parent>
        <component
          :is="element.tag"
          v-for="element in thisState.elements"
          :id="element.id"
          :key="element.id"
          contenteditable
          :src="getImage(element.src)"
          @input="updateContent($event, element.id)"
          v-html="$sanitize(element.content)"
        ></component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  p {
    margin: 0 0 46px;
    padding: 0;
    font-weight: 400;
    line-height: 23px;
    font-size: 15px;
  }

  h2 {
    padding: 0;
    font-weight: 400;
    line-height: 46px;
    font-size: 31px;
    margin: 0 0 33px;
  }

  img {
    margin-bottom: 31px;
  }
}

.action-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 31px;
}
</style>
