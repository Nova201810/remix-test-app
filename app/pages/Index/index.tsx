import Button from '~/components/Button';
import Collapse from '~/components/Collapse';
import Island from '~/components/Island';
import Stack from '~/components/Stack';
import { PAGES, getRoute } from '~/helpers/getRoute';
import styles from './styles.css';

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export default function IndexContent() {
  const questions = [
    { title: 'Вопрос 1', content: 'Ответ 1', key: 'faq-1' },
    { title: 'Вопрос 2', content: 'Ответ 2', key: 'faq-2' },
    { title: 'Вопрос 3', content: 'Ответ 3', key: 'faq-3' },
    { title: 'Вопрос 4', content: 'Ответ 4', key: 'faq-4' },
    { title: 'Вопрос 5', content: 'Ответ 5', key: 'faq-5' },
    { title: 'Вопрос 6', content: 'Ответ 6', key: 'faq-6' },
  ];

  return (
    <Stack space="m">
      <Island size="m" className="Index">
        <Stack space="l">
          <Stack space="m">
            <h1>Сервис подачи заявления</h1>
            <p className="Index__Lead_Info">Сервис позволяет подать заявление с указанием конкретного перечня работ.</p>
          </Stack>
          <div className="Index__Lead_Button">
            <Button kind="primary" as="a" to={getRoute(PAGES.FORM)}>
              Подать заявление
            </Button>
          </div>
        </Stack>
      </Island>
      <Island size="m">
        <Stack space="m">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultricies tortor, eget venenatis nulla. Curabitur scelerisque consequat dui id mattis. Maecenas sollicitudin sodales urna, vitae consequat dolor. Suspendisse in neque tellus. Aliquam quis neque in sem hendrerit fermentum id id lacus. Proin faucibus malesuada diam, non tempus arcu elementum non. Sed vitae tortor semper, facilisis metus a, consequat velit. Mauris eros tortor, commodo consequat metus at, sollicitudin convallis eros. Suspendisse potenti. Mauris fermentum velit ut dui ornare tincidunt. Aliquam et est quis lorem porta posuere vitae ac nunc. Nam sed sem semper, sagittis lacus et, molestie tortor. Aliquam erat volutpat.
          </p>
          <p>
            Fusce nec est eget tortor faucibus accumsan. Fusce hendrerit, turpis vitae blandit bibendum, metus nisi fringilla mauris, nec ultricies ligula purus in augue. Vivamus lobortis arcu nunc, ut finibus nibh elementum et. Ut vitae ligula finibus, venenatis ex vitae, sodales nibh. Donec feugiat consectetur massa quis consequat. Aliquam efficitur efficitur quam et hendrerit. Sed tempus, mi sed dapibus luctus, ligula dolor auctor erat, in posuere neque libero sed neque. Proin eget ante molestie, dignissim nibh non, scelerisque sapien. Integer eu hendrerit erat. Curabitur fermentum nunc ut mauris posuere, sit amet pulvinar ligula pellentesque. Integer accumsan vehicula dignissim. Vivamus tristique neque in tellus suscipit luctus.
          </p>
          <p>
            Suspendisse mi enim, mattis ac fringilla eu, eleifend a dolor. Sed id justo eu felis imperdiet commodo ultrices et mauris. Sed id mi ac turpis sollicitudin sollicitudin. Nunc et elit justo. Vestibulum elit nibh, rutrum vitae dolor in, tempus imperdiet diam. Sed lobortis dui molestie est venenatis vulputate. Nullam nec justo pulvinar, egestas erat quis, tempus justo. Vestibulum mollis vulputate metus, vel suscipit quam ultrices a. In aliquam, felis at fringilla ultricies, purus enim lacinia leo, vel ornare erat lorem et felis. Sed lacinia, ligula ac eleifend sagittis, arcu nunc porttitor velit, ac mollis purus libero non risus. Donec eu dignissim eros. Fusce dapibus mauris metus, vel faucibus sem sagittis vel. Ut semper sit amet magna eu porta. Cras finibus lectus odio, a blandit risus eleifend nec. Vivamus dignissim dolor ligula, in bibendum ante vehicula condimentum.
          </p>
        </Stack>
      </Island>
      <Island size="m" className="Index">
        <Stack space="l">
          {questions.map(({ title, content, key }) => (
            <Collapse key={key} title={title} paramKey={key}>{content}</Collapse>
          ))}
        </Stack>
      </Island>
    </Stack>
  );
}