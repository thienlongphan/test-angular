import { ValidationErrors } from '@angular/forms';
import { Directive, ElementRef, HostListener } from '@angular/core';

const vietnameseToTelexMap: { [key: string]: string } = {
  à: 'a',
  á: 'a',
  ạ: 'a',
  ả: 'a',
  ã: 'a',
  â: 'a',
  ầ: 'a',
  ấ: 'a',
  ậ: 'a',
  ẩ: 'a',
  ẫ: 'a',
  ă: 'a',
  ằ: 'a',
  ắ: 'a',
  ặ: 'a',
  ẳ: 'a',
  ẵ: 'a',

  è: 'e',
  é: 'e',
  ẹ: 'e',
  ẻ: 'e',
  ẽ: 'e',
  ê: 'e',
  ề: 'e',
  ế: 'e',
  ệ: 'e',
  ể: 'e',
  ễ: 'e',

  ì: 'i',
  í: 'i',
  ị: 'i',
  ỉ: 'i',
  ĩ: 'i',

  ò: 'o',
  ó: 'o',
  ọ: 'o',
  ỏ: 'o',
  õ: 'o',
  ô: 'o',
  ồ: 'o',
  ố: 'o',
  ộ: 'o',
  ổ: 'o',
  ỗ: 'o',
  ơ: 'o',
  ờ: 'o',
  ớ: 'o',
  ợ: 'o',
  ở: 'o',
  ỡ: 'o',

  ù: 'u',
  ú: 'u',
  ụ: 'u',
  ủ: 'u',
  ũ: 'u',
  ư: 'u',
  ừ: 'u',
  ứ: 'u',
  ự: 'u',
  ử: 'u',
  ữ: 'u',

  ỳ: 'y',
  ý: 'y',
  ỵ: 'y',
  ỷ: 'y',
  ỹ: 'y',

  đ: 'd',

  // Hoa
  À: 'A',
  Á: 'A',
  Ạ: 'A',
  Ả: 'A',
  Ã: 'A',
  Â: 'A',
  Ầ: 'A',
  Ấ: 'A',
  Ậ: 'A',
  Ẩ: 'A',
  Ẫ: 'A',
  Ă: 'A',
  Ằ: 'A',
  Ắ: 'A',
  Ặ: 'A',
  Ẳ: 'A',
  Ẵ: 'A',

  È: 'E',
  É: 'E',
  Ẹ: 'E',
  Ẻ: 'E',
  Ẽ: 'E',
  Ê: 'E',
  Ề: 'E',
  Ế: 'E',
  Ệ: 'E',
  Ể: 'E',
  Ễ: 'E',

  Ì: 'I',
  Í: 'I',
  Ị: 'I',
  Ỉ: 'I',
  Ĩ: 'I',

  Ò: 'O',
  Ó: 'O',
  Ọ: 'O',
  Ỏ: 'O',
  Õ: 'O',
  Ô: 'O',
  Ồ: 'O',
  Ố: 'O',
  Ộ: 'O',
  Ổ: 'O',
  Ỗ: 'O',
  Ơ: 'O',
  Ờ: 'O',
  Ớ: 'O',
  Ợ: 'O',
  Ở: 'O',
  Ỡ: 'O',

  Ù: 'U',
  Ú: 'U',
  Ụ: 'U',
  Ủ: 'U',
  Ũ: 'U',
  Ư: 'U',
  Ừ: 'U',
  Ứ: 'U',
  Ự: 'U',
  Ử: 'U',
  Ữ: 'U',

  Ỳ: 'Y',
  Ý: 'Y',
  Ỵ: 'Y',
  Ỷ: 'Y',
  Ỹ: 'Y',

  Đ: 'D',
};

@Directive({
  selector: '[appNoVietnameseInput]',
  standalone: true,
})
export class NoVietnameseInputDirective {
  count = 0;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = this.el.nativeElement;

    const oldValue = input.value;
    let newValue = this.vietnameseToTelexKeepOrder(oldValue);
    let offset = 0;

    // for (let i = 0; i < oldValue.length; i++) {
    //   const char = oldValue[i];
    //   const replacement = vietnameseToTelexMap[char];
    //   if (replacement) {
    //     newValue += replacement;
    //     offset += replacement.length - 1;
    //   } else {
    //     newValue += char;
    //   }
    // }
    newValue = newValue.replace(/[\\[\]=;`^$_~#%*{}:<>?\\/+|\\"!-.]/gm, '');

    if (newValue !== oldValue) {
      const cursor = (input.selectionStart || 0) + offset;
      input.value = newValue;
      // input.setSelectionRange(cursor, cursor);
      input.dispatchEvent(new Event('input'));
    }
  }

  // @HostListener('input', ['$event'])
  // onInput(event: InputEvent): void {
  //   const input = this.el.nativeElement;

  //   const oldValue = input.value;
  //   let newValue = this.removeSpecialCharacters(oldValue);
  //   console.log(newValue);
  //   let offset = 0;

  //   // newValue = newValue.replace(/[_\W]/g, '-');

  //   if (newValue !== oldValue) {
  //     const cursor = (input.selectionStart || 0) + offset;
  //     input.value = newValue;
  //     // input.setSelectionRange(cursor, cursor);
  //     input.dispatchEvent(new Event('input'));
  //   }
  // }

  // vietnameseToTelexKeepOrder(input: string): string {
  //   return input
  //     .normalize('NFD') // Tách chữ cái và dấu
  //     .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
  //     .replace(/đ/g, 'd') // Thay đ -> d
  //     .replace(/Đ/g, 'D');
  // }
  vietnameseToTelexKeepOrder(input: string): string {
    const vowelMap: Record<string, string> = {
      à: 'a',
      á: 'a',
      ả: 'a',
      ã: 'a',
      ạ: 'a',
      â: 'aa',
      ầ: 'aa',
      ấ: 'aa',
      ẩ: 'aa',
      ẫ: 'aa',
      ậ: 'aa',
      ă: 'aw',
      ằ: 'aw',
      ắ: 'aw',
      ẳ: 'aw',
      ẵ: 'aw',
      ặ: 'aw',

      è: 'e',
      é: 'e',
      ẻ: 'e',
      ẽ: 'e',
      ẹ: 'e',
      ê: 'ee',
      ề: 'ee',
      ế: 'ee',
      ể: 'ee',
      ễ: 'ee',
      ệ: 'ee',

      ì: 'i',
      í: 'i',
      ỉ: 'i',
      ĩ: 'i',
      ị: 'i',

      ò: 'o',
      ó: 'o',
      ỏ: 'o',
      õ: 'o',
      ọ: 'o',
      ô: 'oo',
      ồ: 'oo',
      ố: 'oo',
      ổ: 'oo',
      ỗ: 'oo',
      ộ: 'oo',
      ơ: 'ow',
      ờ: 'ow',
      ớ: 'ow',
      ở: 'ow',
      ỡ: 'ow',
      ợ: 'ow',

      ù: 'u',
      ú: 'u',
      ủ: 'u',
      ũ: 'u',
      ụ: 'u',
      ư: 'uw',
      ừ: 'uw',
      ứ: 'uw',
      ử: 'uw',
      ữ: 'uw',
      ự: 'uw',

      ỳ: 'y',
      ý: 'y',
      ỷ: 'y',
      ỹ: 'y',
      ỵ: 'y',

      đ: 'dd',

      a: 'a',
      e: 'e',
      i: 'i',
      o: 'o',
      u: 'u',
      y: 'y',
      A: 'A',
      E: 'E',
      I: 'I',
      O: 'O',
      U: 'U',
      Y: 'Y',
      Đ: 'Dd',
    };

    const toneMap: Record<string, string> = {
      à: 'f',
      ằ: 'f',
      ầ: 'f',
      è: 'f',
      ề: 'f',
      ì: 'f',
      ò: 'f',
      ồ: 'f',
      ờ: 'f',
      ù: 'f',
      ừ: 'f',
      ỳ: 'f',
      á: 's',
      ắ: 's',
      ấ: 's',
      é: 's',
      ế: 's',
      í: 's',
      ó: 's',
      ố: 's',
      ớ: 's',
      ú: 's',
      ứ: 's',
      ý: 's',
      ả: 'r',
      ẳ: 'r',
      ẩ: 'r',
      ẻ: 'r',
      ể: 'r',
      ỉ: 'r',
      ỏ: 'r',
      ổ: 'r',
      ở: 'r',
      ủ: 'r',
      ử: 'r',
      ỷ: 'r',
      ã: 'x',
      ẵ: 'x',
      ẫ: 'x',
      ẽ: 'x',
      ễ: 'x',
      ĩ: 'x',
      õ: 'x',
      ỗ: 'x',
      ỡ: 'x',
      ũ: 'x',
      ữ: 'x',
      ỹ: 'x',
      ạ: 'j',
      ặ: 'j',
      ậ: 'j',
      ẹ: 'j',
      ệ: 'j',
      ị: 'j',
      ọ: 'j',
      ộ: 'j',
      ợ: 'j',
      ụ: 'j',
      ự: 'j',
      ỵ: 'j',
    };

    return input
      .split(/\b/)
      .map((word) => {
        let tone = '';
        let converted = '';
        let lastVowelIdx = -1;

        for (let i = 0; i < word.length; i++) {
          const c = word[i];
          if (vowelMap[c]) {
            if (toneMap[c]) tone = toneMap[c];
            const plain = vowelMap[c];
            converted += plain;
            if (/[aeiouy]/i.test(plain.slice(-1)))
              lastVowelIdx = converted.length - 1;
          } else {
            converted += c;
          }
        }

        if (tone && lastVowelIdx !== -1) {
          converted =
            converted.slice(0, lastVowelIdx + 1) +
            tone +
            converted.slice(lastVowelIdx + 1);
        }

        return converted;
      })
      .join('');
  }
}
