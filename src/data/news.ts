export interface NewsProps {
  date: string;
  text: string;
}

export const news: { items: NewsProps[] } = {
  items: [
    {
      date: `Sep 2026`,
      text: `Our paper <strong>"Don't Run with Scissors: Pruning Breaks VLA Models but They Can Be Recovered"</strong> (GLUESTICK) was accepted to <strong>CoRL 2026</strong>! Thanks to all the amazing co-authors.\n`,
    },
  ],
};
