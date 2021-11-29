<?php
require 'vendor/autoload.php';

use Pearl\CsvJsonConverter\Type\CsvToJson;


/**
 * Class Convert
 */
class Convert extends CsvToJson
{
    /**
     * @var string
     */
    private $file = "list.csv";

    /**
     * @var string
     */
    private $output = "src/list_json";

    /**
     * @inheritDoc
     */
    public function __construct($data = null, array $options = [])
    {
        parent::__construct($data, $options);
        $this->conversion = [
            'extension' => 'json',
            'type' => 'application/json',
            'delimiter' => ';',
            'enclosure' => '"',
            'escape' => '\\'
        ];
    }

    /**
     * @return string
     */
    public function getFile(): string
    {
        return $this->file;
    }

    /**
     * @param string $file
     */
    public function setFile(string $file): void
    {
        $this->file = $file;
    }

    /**
     * @return string
     */
    public function getOutput(): string
    {
        return $this->output;
    }

    /**
     * @param string $output
     */
    public function setOutput(string $output): void
    {
        $this->output = $output;
    }


    /**
     * You can rewrite convert procedure for you custom csv import file
     *
     * @return Exception|false|string
     * @throws Exception
     */
    public function convert()
    {
        if (empty($this->data) === false && is_array($this->data)) {
            $bitmask = empty($this->options['bitmask']) === false ? $this->options['bitmask'] : 0;
            $keys = [
                'num',
                'name'
            ];
            $result = [];
            foreach ($this->data as $key => $values) {
                $row = array_filter(str_getcsv($values, $this->conversion['delimiter'], $this->conversion['enclosure'], $this->conversion['escape']));
                if (count($row) > 4 && key_exists(0, $row) && key_exists(2, $row)) {
                    $rowItem = [
                        $row[0],
                        $row[2]
                    ];
                    $result[] = array_combine($keys, $rowItem);
                }
            }

            return json_encode($result, $bitmask);
        } else {
            throw new \Exception("Invalid data given");
        }
    }

}

$csvToJson = new Convert();
$csvToJson->load($csvToJson->getFile());
$csvToJson->convertAndSave($csvToJson->getOutput());
